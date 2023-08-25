export interface PartnerFeeInput {
    advertisers: {
        id: string;
    }[] | null;
    apply_to_deals: boolean;
    apply_to_managed: boolean;
    apply_to_rtb: boolean;
    available_for_all_advertisers: boolean;
    description?: string | null;
    currency?: string | null;
    name: string;
    partner_fee_payment_type_id: number;
    partner_fee_basis_id: number;
    partner_fee_type_id: number;
    partner_fee_vendor_id: number;
    required?: boolean;
    value: number;
}
export declare type PartnerFee = Required<PartnerFeeInput> & {
    id: number;
};
