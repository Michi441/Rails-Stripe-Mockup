class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable



  def stripe_customer
    ## IF THERE IS AN STRIPE ID
    if stripe_id?
      ## GET THE CUSTOMER INFORMATION
      Stripe::Customer.retrieve(stripe_id)
    else
      ## ELSE CREATE A NEW CUSTOMER
      stripe_customer = Stripe::Customer.create(email: email)
      ## UPDATE THE STRIPE ID IN THE SCHEMA
      update(stripe_id: stripe_customer.id)

      stripe_customer
    end
  end

  def subscribed?
    stripe_subscription_id? || (expires_at? && Time.zone.now < expires_at)
  end
end
