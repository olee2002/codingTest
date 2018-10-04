class Employee < ApplicationRecord
  PAGE_SIZE = "2"
  API_BASE_URL = "https://api.salesloft.com/v2/people?per_page=#{PAGE_SIZE}"

  include HTTParty
  puts "hello"

  def get_api_data
    response = HTTParty.get(API_BASE_URL, headers: headers)
    data = response.data
    puts JSON.pretty_generate(data)
    return data
  end

  employee = Employee.new
  employee.get_api_data

  private

  def headers
    {
      "Authorization" => "Bearer #{ENV.fetch("SALESLOFT_API_KEY")}",
    }
  end
end
