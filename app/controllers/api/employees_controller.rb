class Api::EmployeesController < Api::BaseController
  respond_to :json

  def index
    @employee = Employee.all
    response = @employee
    render json: response
  end
end
