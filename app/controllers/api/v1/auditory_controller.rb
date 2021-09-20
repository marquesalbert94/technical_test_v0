class Api::V1::AuditoryController < ApplicationController
  def index
    @auditories = Auditory.all
  end

  def new
    @auditory = Auditory.new
  end

  def create
    @auditory = Auditory.new(auditory_params)
  end
  def destroy
    @auditory.destroy
  end



  private
  # Use callbacks to share common setup or constraints between actions.
  def set_auditory
    @auditory = Auditory.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def auditory_params
    params.require(:auditory).permit(:nombreCampo, :valorAnterior, :valorActual)
  end
end
