import React from 'react'
import Card from '../../components/Card'

const BalanceForm = ({ className }) => {
    return (
        <Card className={`p-5 ${className}`}>
            <div className="flex gap-4 text-center h-full items-center">
                <p className="w-1/2">Total Price:</p>
                <p className="w-1/2" id="soTotalPriceShowcase">
                    0
                </p>
            </div>
        </Card>
    )
}

export default BalanceForm
