require "bank_account"

describe BankAccount do
  let(:account) { BankAccount.new("John Lennon", "FR14-2004-1010-0505-0001-3M02-606", 200, "yoko") }

  describe 'Getters' do
    it 'has a way to access the account name' do
      expect(account.name).to eq 'John Lennon'
    end

    it 'has a way to access the account balance' do
      expect(account.balance).to be_a Integer
    end
  end

  describe 'Security' do
    it 'has no way to modify the account name from the outside world' do
      expect(account).not_to respond_to(:name=)
    end

    it 'has no way to modify the account balance from the outside world' do
      expect(account).not_to respond_to(:balance=)
    end

    it 'has no way to access the account transactions from the outside world' do
      expect(account).not_to respond_to(:transactions)
    end
    
    it 'has no way to access the account password from the outside world' do
      expect(account).not_to respond_to(:password)
    end

    it 'accesses only partial IBAN from the outside world' do
      expect(account.iban).to match /FR14\*+606/
    end
    
    it 'has no way to modify the account IBAN from the outside world' do
      expect(account).not_to respond_to(:iban=)
    end
  end
  
  describe '#add_transaction (private)' do
    it 'adds transactions to your account' do
      account.send(:add_transaction, 200)
      expect(account.instance_variable_get(:@transactions).length).to eq 2
    end
    
    it 'updates its balance when a new transaction is made' do
      account.send(:add_transaction, -100)
      expect(account.balance).to eq 100
    end
  end
  
  describe '#to_s' do
    it 'returns a string' do
      expect(account.to_s).to be_a String
    end
    
    it 'returns data about the account' do
      expect(account.to_s).to match /#{account.name}/
    end
    
    it 'returns hidden IBAN' do
      expect(account.to_s).to match /FR14\*+606/
    end
  end
  
  describe '#withdraw' do
    it 'changes the account balance' do
      account.withdraw(50)
      expect(account.balance).to eq 150
    end
    
    it 'returns a message containing the withdrawn amount' do
      expect(account.withdraw(150)).to match /150/
    end
  end
  
  describe '#deposit' do
    it 'changes the account balance' do
      account.deposit(200)
      expect(account.balance).to eq 400
    end
    
    it 'returns a message containing the deposit amount' do
      expect(account.deposit(150)).to match /150/
    end
  end
  
  describe '#transactions_history' do
    it 'verifies the given password' do
      expect(account.transactions_history(password: 'sdofijdsi')).to eq 'wrong password'
    end
    
    it 'is not happy if you do not provide a password' do
      expect(account.transactions_history()).to eq 'no password given'
    end
    
    it 'displays all your transactions if given the correct password' do
      account.instance_variable_set(:@transactions, [300])
      expect(account.transactions_history(password: 'yoko')).to match /300/
    end
  end
end
