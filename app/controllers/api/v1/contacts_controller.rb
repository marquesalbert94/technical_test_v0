class Api::V1::ContactsController < ApplicationController
  before_action :set_contact, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token, only: %i[ edit destroy create update ]

  # GET /contacts or /contacts.json
  def index
    @contacts = Contact.all
    render json: @contacts
  end

  # GET /contacts/1 or /contacts/1.json
  def show
    if @contact
      render json: @contact
    else
      render json: @contact.errors
    end
  end

  # GET /contacts/new
  def new
    @contact = Contact.new
  end

  # GET /contacts/1/edit
  def edit
  end

  # POST /contacts or /contacts.json
  def create
    @contact = Contact.new(contact_params)


    if @contact.save
      @first_name = @contact.firstName
      @last_name = @contact.lastName
      @email = @contact.email
      @phone_number = @contact.phoneNumber

      @auditory1 = @contact.auditories.new(nombreCampo: 'firstName', valorAnterior: '', valorActual: @first_name )
      @auditory2 = @contact.auditories.new(nombreCampo: 'lastName', valorAnterior: '', valorActual: @last_name, contact_id: @contact.id)
      @auditory3 = @contact.auditories.new(nombreCampo: 'email', valorAnterior: '', valorActual: @email, contact_id: @contact.id )
      @auditory4 = @contact.auditories.new(nombreCampo: 'phoneNumber', valorAnterior: '', valorActual: @phone_number, contact_id: @contact.id )

      @auditory1.save
      @auditory2.save
      @auditory3.save
      @auditory4.save
      render json: @contact
    else
      render json: @contact.errors
    end
  end

  # PATCH/PUT /contacts/1 or /contacts/1.json
  def update
    @contact = Contact.find(params[:id])
    @first_name_old = @contact.firstName
    @last_name_old = @contact.lastName
    @email_old = @contact.email
    @phone_number_old = @contact.phoneNumber
    @contact.update(contact_params)
    @first_name_new = @contact.firstName
    @last_name_new = @contact.lastName
    @email_new = @contact.email
    @phone_number_new = @contact.phoneNumber
    @auditory1 = nil
    @auditory2 = nil
    @auditory3 = nil
    @auditory4 = nil
    if @first_name_old != @first_name_new
      @auditory1 = @contact.auditories.new(nombreCampo: 'firstName', valorAnterior: @first_name_old, valorActual: @first_name_new)
    end
    if @last_name_old != @last_name_new
      @auditory2 = @contact.auditories.new(nombreCampo: 'lastName', valorAnterior: @last_name_old, valorActual: @last_name_new)
    end
    if @email_old != @email_new
      @auditory3 = @contact.auditories.new(nombreCampo: 'email', valorAnterior: @email_old, valorActual: @email_new)
    end
    if @phone_number_old != @phone_number_new
      @auditory4 = @contact.auditories.new(nombreCampo: 'phoneNumber', valorAnterior: @phone_number_old, valorActual: @phone_number_new )
    end
    if @contact.save
      if @auditory1
        @auditory1.save
      end
      if @auditory2
        @auditory2.save
      end
      if @auditory3
        @auditory3.save
      end
      if @auditory4
        @auditory4.save
      end

      render json: @contact
    else
      render json: @contact.errors
    end
  end

  # DELETE /contacts/1 or /contacts/1.json
  def destroy
    @auditory= Auditory.find_by_contact_id(@contact.id)
    while @auditory
      @auditory.destroy
      @auditory= Auditory.find_by_contact_id(@contact.id)
    end
    @contact.destroy
    render json: { notice: 'Contact was successfully removed.' }
  end

  def auditory
    @contact = Contact.find(params[:id])
    @auditory= Auditory.find_by_sql("SELECT id, nombreCampo, valorActual, valorAnterior, strftime('%d/%m/%Y %H:%M',created_at) created_date FROM auditories WHERE contact_id = ?", binds=[@contact.id] )
    render json: @auditory
  end


  private
  # Use callbacks to share common setup or constraints between actions.
  def set_contact
    @contact = Contact.find(params[:id])
  end


  # Only allow a list of trusted parameters through.
  def contact_params
    params.require(:contact).permit(:firstName, :lastName, :email, :phoneNumber)
  end

end
