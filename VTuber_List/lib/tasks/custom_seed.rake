namespace :db do
  namespace :seed do

    Dir[File.join(Rails.root, 'db', 'seeds', '*.rb')].each do |filename|
      task_name = File.basename(filename, '.rb').intern

      # Now we will create multiple tasks by each file name inside db/seeds directory.

      task task_name => :environment do
        load(filename)
      end
    end

    # This is for if you want to run all seeds inside db/seeds directory
    task :all => :environment do
      Dir[File.join(Rails.root, 'db', 'seeds', '*.rb')].sort.each do |filename|
        load(filename)
      end
    end

  end
end
