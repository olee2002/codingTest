class Api::EmployeesController < Api::BaseController
  respond_to :json

  def index
    @employee = Employee.all
    render json: @employee
  end

  def find_duplicates
    Employee.where("email_address LIKE ?", "%#{params[:email_address]}%")
  end
end
