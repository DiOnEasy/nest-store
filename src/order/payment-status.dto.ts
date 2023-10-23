export class PaymentStatusDto {
	order_status:
		| 'created'
		| 'processing'
		| 'declined'
		| 'approved'
		| 'expired'
		| 'reversed'
     order_id: string
    }

class AmountPayment{
    value: string
    currency: string
}

