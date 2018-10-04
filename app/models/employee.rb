class Employee < ApplicationRecord
  API_BASE_URL = "https://api.salesloft.com/v2"
  PAGE_SIZE = "2"
  URL = "#{API_BASE_URL}/people?per_page=#{PAGE_SIZE}"
  HEADERS = {"Authorization" => "Bearer #{ENV.fetch("SALESLOFT_API_KEY")}"}

  include HTTParty
  puts "hello"

  def get_api_data
    response = HTTParty.get(URL, headers: HEADERS)
    data = response["data"]
    return data
  end

  employee = Employee.new
  employee.get_api_data.each do |record|
    puts JSON.pretty_generate(record)
  end
end
