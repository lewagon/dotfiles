# Encoding: utf-8

require "spec_helper"
require "account"

describe BankAccount do
  let(:account) { BankAccount.new("Bruce Lee", "FR14-2004-1010-0505-0001-3M02-606", 200, "brucelit") }

  describe 'Getters' do
    it 'has a way to access the account name' do
      account.name.must_equal 'Bruce Lee'
    end

    it 'has a way to access the account iban' do
      account.iban.must_match /FR14\*+606/
    end

    it 'has a way to access the account position' do
      account.position.must_equal 200
    end
  end

  describe '#add_transaction (private)' do
    it 'add transactions to your account' do
      account.send(:add_transaction, 200)
      account.instance_variable_get(:@transactions).length.must_equal 2
    end

    it 'update its position when a new transaction is made' do
      account.send(:add_transaction, -200)
      account.position.must_equal 0
    end
  end


  describe '#to_s' do
    it 'returns a string' do
      account.to_s.must_be_instance_of String
    end

    it 'returns data about the account' do
      account.to_s.must_match /#{account.name}/
    end
  end

  describe '#withdraw' do
    it 'changes the accounts position' do
      account.withdraw(200)
      account.position.must_equal 0
    end

    it 'returns a message containing the withdrawn amount' do
      account.withdraw(150).match /150/
    end
  end

  describe '#deposit' do
    it 'changes the accounts position' do
      account.deposit(200)
      account.position.must_equal 400
    end

    it 'returns a message containing the deposit amount' do
      account.deposit(150).match /150/
    end
  end

  describe '#transactions_history' do
    it 'verifies the given password' do
      account.transactions_history(password: 'sdofijdsi').must_equal 'wrong password'
    end

    it 'is not happy if you do not give it any password' do
      account.transactions_history().must_equal 'no password given'
    end

    it 'displays all your transactions if given the correct password' do
      account.instance_variable_set(:@transactions, [300])
      account.transactions_history(password: 'brucelit').must_match /300/
    end
  end
end
