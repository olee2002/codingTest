class Api::EmployeesController < Api::BaseController
  respond_to :json

  def index
    @employee = Employee.all
    render json: @employee
  end

  def find_duplicates
    render json: "test"
  end
end
