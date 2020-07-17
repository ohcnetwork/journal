namespace :history do
  desc "Cleanup all user history prior to x days, defaults to 30\
  modifyable via ENV['HISTORY_ERASE_BEFORE']"

  task clear: :environment do
    HistoryService.clean
  end
end
