

if [ "$#" -eq 0 ]; then
    echo "USAGE: ./aks_cluster_keyvault.sh [\$RG_NAME] \$CLUSTER_NAME \$K8S_VERSION"
    exit 0
fi

export RG_NAME=$1
export CLUSTER_NAME=$2
export K8S_V=${3:-'1.17.3'}
export LOC=westus
export KEYVAULT_NAME=kv$RG_NAME-$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 10 | head -n 1)

# create RG
az group create \
  --name $RG_NAME \
  --location $LOC


# Create AKS Cluster
az aks create \
  --name $CLUSTER_NAME \
  --location $LOC \
  --resource-group $RG_NAME \
  --nodepool-name linux --node-count 1 \
  --enable-addons monitoring \
  --generate-ssh-keys \
  --kubernetes-version $K8S_V \
  --query "{ name: name, resourceGroup: resourceGroup }"

# Switch Context to newly created cluster
az aks get-credentials --name $CLUSTER_NAME -g $RG_NAME

# create Key vault
export KEYVAULT_ID=$(az keyvault create --name $KEYVAULT_NAME --resource-group $RG_NAME --location $LOC --query id -o tsv)
# Set Secrets
az keyvault secret set --vault-name $KEYVAULT_NAME --name databasePassword --value $(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 10 | head -n 1)
az keyvault secret set --vault-name $KEYVAULT_NAME --name storageToken --value $(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 10 | head -n 1)

# Create Service Principal
export SP_CLIENT_ID=$(az ad sp create-for-rbac --name "$RG_NAME-sp" --role="Contributor" --scopes $KEYVAULT_ID --query "{appId: appId}" -o tsv)
export SP_CLIENT_SECRET=$(az ad sp credential reset --name $RG_NAME-sp --credential-description $RG_NAME --query password -o tsv)

# Add credentials to K8s cluster
kubectl create secret generic secrets-store-creds --from-literal clientid=$SP_CLIENT_ID --from-literal clientsecret=$SP_CLIENT_SECRET

# assign roles and policies
az role assignment create --role Reader --assignee $SP_CLIENT_ID --scope $KEYVAULT_ID

az keyvault set-policy -n $KEYVAULT_NAME --secret-permissions get --spn $SP_CLIENT_ID
az keyvault set-policy -n $KEYVAULT_NAME --certificate-permissions get --spn $SP_CLIENT_ID
az keyvault set-policy -n $KEYVAULT_NAME --key-permissions get --spn $SP_CLIENT_ID




