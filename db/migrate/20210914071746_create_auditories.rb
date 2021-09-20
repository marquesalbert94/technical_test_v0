class CreateAuditories < ActiveRecord::Migration[6.1]
  def change
    create_table :auditories do |t|
      t.string :nombreCampo, {null: false}
      t.string :valorAnterior, {null: false}
      t.string :valorActual, {null: false}
      t.references :contact, null: false, foreign_key: true

      t.timestamps
    end
  end
end
