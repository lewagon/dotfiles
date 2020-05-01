

if [ "$#" -eq 0 ]; then
    echo "USAGE: ./cluster.sh [\$RG_NAME] \$CLUSTER_NAME \$K8S_VERSION"
    exit 0
fi

RG_NAME=$1
CLUSTER_NAME=$2
K8S_V=${3:-'1.17.3'}
LOC=westus
az group create \
  --name $RG_NAME \
  --location $LOC

#az aks create --resource-group myResourceGroup --name myAKSCluster --node-count 1 --enable-addons monitoring --generate-ssh-keys


az aks create \
    --name $CLUSTER_NAME \
    --location $LOC \
    --resource-group $RG_NAME \
    --nodepool-name linux --node-count 1 \
    --enable-addons monitoring \
    --generate-ssh-keys \
    --kubernetes-version $K8S_V \
    --query "{ name: name, resourceGroup: resourceGroup }"
