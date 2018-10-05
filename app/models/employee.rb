class Employee < ApplicationRecord
  API_BASE_URL = "https://api.salesloft.com/v2"
  #control the number of data
  PAGE_SIZE = "100"
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
      !person.first_name ? person.first_name = record["first_name"] : Nil
      !person.last_name ? person.last_name = record["last_name"] : Nil
      !person.email_address ? person.email_address = record["email_address"] : Nil
      !person.title ? person.title = record["title"] : Nil
    end
  end
end
