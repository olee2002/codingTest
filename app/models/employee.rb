class Employee < ApplicationRecord
  validates_uniqueness_of :email_address

  API_BASE_URL = "https://api.salesloft.com/v2"
  #control the number of data
  PAGE_SIZE = "50"
  URL = "#{API_BASE_URL}/people?per_page=#{PAGE_SIZE}"
  HEADERS = {"Authorization" => "Bearer #{ENV.fetch("SALESLOFT_API_KEY")}"}

  include HTTParty

  def get_api_data
    response = HTTParty.get(URL, headers: HEADERS)
    data = response["data"]
    return data
  end

  employee = Employee.new
  employee.get_api_data.each do |record|
    Employee.create do |person|
      person.first_name = record["first_name"]
      person.last_name = record["last_name"]
      person.email_address = record["email_address"]
      person.title = record["title"]
    end
  end
end
