class LoadLocalBodiesData < ActiveRecord::Migration[6.0]
  def change
    LocalBodyLoaderService.new.run!
  end
end
