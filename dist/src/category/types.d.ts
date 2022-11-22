import type { CountriesAndBrands } from '../brand/types';
export interface Category {
    id: number;
    name: string;
    is_sensitive: boolean;
    requires_whitelist: boolean;
    requires_whitelist_on_managed: boolean;
    requires_whitelist_on_external: boolean;
    last_modified: string;
    is_brand_eligible: boolean;
    countries_and_brands: CountriesAndBrands[];
}
