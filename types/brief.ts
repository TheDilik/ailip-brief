export interface CompetitorRow {
  name: string;
  website: string;
  strengths: string;
  weaknesses: string;
  our_advantage: string;
}

export interface CompetitorSiteRow {
  url: string;
  liked: string;
  disliked: string;
}

export interface KeyStatsRow {
  key: string;
  label: string;
  value: string;
}

export interface ColorRow {
  role: string;
  hex: string;
  rgb: string;
  comment: string;
}

export interface ReferenceRow {
  url: string;
  what_liked: string;
  what_to_use: string;
}

export interface NegativeReferenceRow {
  url: string;
  what_disliked: string;
  what_to_avoid: string;
}

export interface AudienceSegment {
  portrait: string;
  age_gender: string;
  location: string;
  language: string;
  income_budget: string;
  selection_criteria: string;
  how_they_search: string;
  online_presence: string;
  main_fear: string;
  what_convinces_them: string;
}

export interface BriefFormData {
  // Section 1
  company_name_en: string;
  company_name_ar: string;
  brand_name: string;
  founded_year: string;
  employees_count: string;
  cr_number: string;
  vat_number: string;
  legal_address: string;
  showroom_address: string;
  contact_name: string;
  contact_position: string;
  phone_whatsapp: string;
  email: string;
  website: string;
  social_links: string;

  // Section 2
  directions: string[];
  other_directions: string;

  // Section 3
  company_description: string;
  company_history: string;
  mission_vision: string;
  brand_values: string;
  tagline_en: string;
  tagline_ar: string;
  key_stats: KeyStatsRow[];
  certificates_licenses: string;
  landmark_projects: string;
  notable_clients: string;

  // Section 4
  competitors: CompetitorRow[];
  indirect_competitors: string;
  unique_selling_proposition: string;
  sales_argument: string;
  common_objections: string;
  competitor_sites: CompetitorSiteRow[];

  // Section 5
  audience_segment_1: AudienceSegment;
  audience_segment_2: AudienceSegment;
  how_clients_find_you: string;
  sales_funnel: string;
  average_deal_cycle: string;
  average_check_sar: string;

  // Section 6
  goals_priority: Record<string, number>;
  monthly_leads_target: string;
  success_criteria: string;

  // Section 7
  page_blocks: Record<string, string>;
  content_availability: Record<string, string>;
  content_to_create: string;

  // Section 8
  visual_style: string;
  color_palette: ColorRow[];
  typography: string[];
  corporate_font: string;
  positive_references: ReferenceRow[];
  negative_references: NegativeReferenceRow[];
  forbidden_elements: string;

  // Section 9
  languages: string[];
  domain: string;
  hosting_status: string;
  features: Record<string, string>;
  cms: string[];
  cms_other: string;
  cms_manager: string;

  // Section 10
  budget: string;
  content_production_budget: string;
  marketing_budget: string;
  desired_launch_date: string;
  hard_deadline: string;
  deadline_reason: string;
  launch_event: string;
  timeline: string;
  additional_services: Record<string, string>;
  ideal_website_description: string;
  ksa_specifics: string;
  mistakes_to_avoid: string;
  anything_else: string;
  mvp_priority: string;
  communication_preference: string[];
  update_frequency: string;

  // Submission
  client_name: string;
  client_signature_date: string;
}

export const initialBriefData: BriefFormData = {
  company_name_en: "", company_name_ar: "", brand_name: "", founded_year: "",
  employees_count: "", cr_number: "", vat_number: "", legal_address: "",
  showroom_address: "", contact_name: "", contact_position: "", phone_whatsapp: "",
  email: "", website: "", social_links: "",
  directions: [], other_directions: "",
  company_description: "", company_history: "", mission_vision: "", brand_values: "",
  tagline_en: "", tagline_ar: "",
  key_stats: [
    { key: "years_on_market", label: "Лет на рынке", value: "" },
    { key: "projects_completed", label: "Завершённых проектов", value: "" },
    { key: "satisfied_clients", label: "Довольных клиентов", value: "" },
    { key: "sqm_built", label: "м² построено", value: "" },
    { key: "countries", label: "Стран присутствия", value: "" },
    { key: "employees", label: "Сотрудников", value: "" },
    { key: "production_area", label: "Производственная площадь, м²", value: "" },
    { key: "revenue", label: "Оборот (опционально)", value: "" },
  ],
  certificates_licenses: "", landmark_projects: "", notable_clients: "",
  competitors: Array(6).fill(null).map(() => ({ name: "", website: "", strengths: "", weaknesses: "", our_advantage: "" })),
  indirect_competitors: "", unique_selling_proposition: "", sales_argument: "",
  common_objections: "",
  competitor_sites: Array(5).fill(null).map(() => ({ url: "", liked: "", disliked: "" })),
  audience_segment_1: { portrait: "", age_gender: "", location: "", language: "", income_budget: "", selection_criteria: "", how_they_search: "", online_presence: "", main_fear: "", what_convinces_them: "" },
  audience_segment_2: { portrait: "", age_gender: "", location: "", language: "", income_budget: "", selection_criteria: "", how_they_search: "", online_presence: "", main_fear: "", what_convinces_them: "" },
  how_clients_find_you: "", sales_funnel: "", average_deal_cycle: "", average_check_sar: "",
  goals_priority: { lead_generation: 0, brand_positioning: 0, new_markets: 0, sales_support: 0, portfolio_showcase: 0, investor_attraction: 0, recruitment: 0, site_replacement: 0, vision_2030: 0 },
  monthly_leads_target: "", success_criteria: "",
  page_blocks: {}, content_availability: {}, content_to_create: "",
  visual_style: "", color_palette: Array(5).fill(null).map(() => ({ role: "", hex: "", rgb: "", comment: "" })),
  typography: [], corporate_font: "",
  positive_references: Array(7).fill(null).map(() => ({ url: "", what_liked: "", what_to_use: "" })),
  negative_references: Array(5).fill(null).map(() => ({ url: "", what_disliked: "", what_to_avoid: "" })),
  forbidden_elements: "",
  languages: [], domain: "", hosting_status: "",
  features: {}, cms: [], cms_other: "", cms_manager: "",
  budget: "", content_production_budget: "", marketing_budget: "",
  desired_launch_date: "", hard_deadline: "", deadline_reason: "", launch_event: "",
  timeline: "", additional_services: {},
  ideal_website_description: "", ksa_specifics: "", mistakes_to_avoid: "",
  anything_else: "", mvp_priority: "",
  communication_preference: [], update_frequency: "",
  client_name: "", client_signature_date: "",
};
