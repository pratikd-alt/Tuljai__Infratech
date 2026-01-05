export type View = 'dashboard' | 'reports' | 'planning' | 'tendering' | 'projectControl' | 'users' | 'hr' | 'ess' | 'activity' | 'tasks' | 'dpr' | 'collaboration' | 'payables' | 'receivables' | 'accounts' | 'gst' | 'calendar' | 'financials' | 'supplyChain' | 'subcontracts' | 'chartOfAccounts' | 'ledger' | 'payroll' | 'financialReporting' | 'projectProfitability' | 'equityReporting' | 'companySettings' | 'landingPageSettings' | 'materialManagement' | 'tdsCompliance' | 'userManual' | 'fixedAssetRegister' | 'taxDepreciation' | 'cashFlowForecast' | 'budgetVsActuals' | 'ebitdaReporting' | 'ratioAnalysis' | 'procurement' | 'qualityControl';

export type ToastType = 'success' | 'error' | 'info' | 'warning';
export interface ToastMessage { id: number; message: string; type: ToastType; }

export interface Attachment { id: string; name: string; type: string; url: string; }

export interface DprPermissions {
    canAdd?: boolean;
    canComment?: boolean;
    canViewAI?: boolean;
    canViewDashboard?: boolean;
}

export interface HrPermissions {
    canViewDashboard?: boolean;
    canViewDirectory?: boolean;
    canManageAttendance?: boolean;
    canManageLeave?: boolean;
    canViewOrgChart?: boolean;
    canManagePolicies?: boolean;
    canManageDepartments?: boolean;
}

export interface UserPermissions {
    dashboard?: boolean; ess?: boolean; tasks?: boolean; reports?: boolean; planning?: boolean; tendering?: boolean;
    dpr?: boolean | DprPermissions;
    supplyChain?: boolean; materialManagement?: boolean; subcontracts?: boolean; collaboration?: boolean;
    projectControl?: boolean; users?: boolean;
    hr?: boolean | HrPermissions;
    payroll?: boolean; activity?: boolean; calendar?: boolean; accounts?: boolean; payables?: boolean; receivables?: boolean; gst?: boolean;
    tdsCompliance?: boolean; financialReporting?: boolean; projectProfitability?: boolean; cashFlowForecast?: boolean;
    budgetVsActuals?: boolean; ebitdaReporting?: boolean; ratioAnalysis?: boolean; fixedAssetRegister?: boolean;
    taxDepreciation?: boolean; financials?: boolean; ledger?: boolean; chartOfAccounts?: boolean; equityReporting?: boolean;
    companySettings?: boolean; landingPageSettings?: boolean; userManual?: boolean; procurement?: boolean; qualityControl?: boolean;
}

export interface Role { id: string; name: string; category: 'management' | 'client'; defaultPermissions: UserPermissions; }

export interface KRA { id: string; title: string; description: string; weightage: number; kpis?: KPI[]; }
export interface KPI { id: string; kraId: string; metric: string; target: string; progress: number; }

export interface User {
    id: string; name: string; email: string; avatar?: string; roleId: string; permissions: UserPermissions;
    employeeId?: string; jobTitle?: string; dateOfJoining?: string; reportingTo?: string[];
    contactNumber?: string; address?: string; emergencyContact?: { name: string; phone: string };
    status: 'Active' | 'Exited' | 'On Leave'; lastWorkingDay?: string;
    panNumber?: string; aadharNumber?: string; pfAccountNumber?: string; uanNumber?: string;
    bankDetails?: { bankName: string; accountNumber: string; branch: string; ifscCode: string; };
    salary?: SalaryStructure; salaryHistory?: SalaryRevision[];
    employeePayableAccountId?: string; employeeAdvanceAccountId?: string;
    kras?: KRA[]; kpis?: KPI[]; leaveBalance?: { earned: number; sick: number; casual: number }; loans?: Loan[];
}

export interface ProjectData { projects: Project[]; portfolioSummary: PortfolioSummary; }

export interface Project {
    id: string; name: string; client: string; status: 'Planning' | 'Bidding' | 'On Track' | 'Delayed' | 'At Risk' | 'Completed' | 'Corporate';
    budget: number; spent: number; bidAmount?: number; profitMargin: number;
    startDate?: string; endDate?: string;
    milestones: Milestone[]; risks: Risk[]; dailyProgress: DailyProgress[];
    boq: BOQHead[]; extraBoq?: BOQHead[]; overheads?: ProjectOverhead[]; wbs: WBSStage[];
    billingPattern: 'itemized' | 'milestone'; resourcePool?: ProjectResource[];
    generatedWprs?: AIEnhancedWPR[]; generatedMprs?: AIEnhancedMPR[]; prms?: ProgressReviewMeeting[];
    tenderDocuments?: Attachment[]; tenderLogs?: TenderLog[];
    billingDetails?: { address: string; gst: string; pan?: string };
    locationDetails?: { address: string; googleMapsLink?: string };
    clientContactDetails?: { name: string; email: string; phone: string };
    otherAwardDetails?: string; loiDocument?: Attachment; workOrderDocument?: Attachment;
    materialRates?: Record<string, { unit: string; rate: number }>; baseline?: WBSStage[];
    rfis?: RFI[];
}

export interface Milestone { id: string; name: string; plannedDate: string; actualDate?: string; }
export interface Risk { id: string; description: string; severity: 'High' | 'Medium' | 'Low'; dateIdentified: string; mitigationPlan?: string; }
export interface BOQHead { id: string; itemCode: string; description: string; subHeads: BOQSubHead[]; }
export interface BOQSubHead { id: string; itemCode: string; description: string; items: BOQItem[]; }
export interface BOQItem {
    id: string; itemCode: string; description: string; quantity: number; unit: string; workingRate: number; tenderRate: number;
    rateAnalysis?: RateAnalysis; projectId?: string; notes?: string; masterCode?: string; type?: string; head?: string; subHead?: string;
}
export interface RateAnalysisItem {
    id: string;
    category: 'Material' | 'Labor' | 'Plant & Machinery' | 'Other Expenses';
    particulars: string;
    unit: string;
    quantity: number;
    rate: number;
    notes?: string;
    isAiGenerated?: boolean;
    aiReasoning?: string;
}
export interface MethodologyStep {
    id: string;
    title: string;
    description: string;
    requiredResources?: string[];
    safetyHazards?: string[];
    isHoldPoint?: boolean;
}

export interface ComplianceDetails {
    score: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    safetyRequirements: string[];
    checklists: {
        preExecution: string[];
        execution: string[];
        postExecution: string[];
    };
    relevantStandards: {
        code: string;
        description: string;
    }[];
}

export interface RateAnalysis {
    items: RateAnalysisItem[];
    attachments?: Attachment[];
    methodology?: MethodologyStep[];
    compliance?: ComplianceDetails;
    qaIssues?: string[];
}

export type RFIStatus = 'Raised' | 'Inspection Scheduled' | 'Inspected' | 'Accepted' | 'Rejected';

export interface RFICheckpoint extends Omit<MethodologyStep, 'id'> {
    id: string;
    originalStepId: string;
    status: 'Comply' | 'Observation' | 'Non-Comply' | 'Not Applicable';
    remarks?: string;
}

export interface RFI {
    id: string;
    rfqNumber: string;
    projectId: string;
    wbsStageId: string;
    boqItemId: string;
    location: string;
    status: RFIStatus;
    raisedBy: string;
    raisedAt: string;
    inspectionDate?: string;
    checkpoints: RFICheckpoint[];
    photos: Attachment[];
    qcEngineerId?: string;
    clientEngineerId?: string;
    pmId?: string;
    qcRemarks?: string;
    clientRemarks?: string;
    pmRemarks?: string;
    qcSignedAt?: string;
    clientSignedAt?: string;
    pmSignedAt?: string;
}

export interface ProjectOverhead { id: string; category: 'Executional' | 'Project' | 'Admin'; description: string; type: 'Monthly' | 'Lump Sum'; cost: number; durationMonths?: number; }
export type OverheadCategory = 'Executional' | 'Project' | 'Admin';
export interface WBSStage { id: string; name: string; plannedStartDate: string; plannedEndDate: string; actualStartDate?: string; actualCompletionDate?: string; stageAllocations: StageAllocation[]; allocatedBudget?: number; dependsOn?: string[]; }
export interface StageAllocation { boqItemId: string; quantity: number; cumulativeCompletedQty?: number; resourceAllocations?: ResourceAllocation[]; }
export interface ResourceAllocation { resourceId: string; resourceName: string; quantity: number; }
export interface ProjectResource { id: string; name: string; type: 'Labor' | 'Machinery'; unit: string; }
export interface DailyProgress {
    date: string; progressPercentage: number; executionSummary: string; weather: string;
    manpower: ManpowerAllocation[]; machinery: MachineryAllocation[]; materials: MaterialLog[];
    safetyIncidents: SafetyIncident[]; photos: Photo[]; videos?: Video[]; documents?: Document[];
    workProgress?: WorkProgressItem[]; aiBriefing?: any; isAiBriefingApproved?: boolean;
    clientRemarks?: { text: string; timestamp: string; userId: string; };
    stageUpdates?: Record<string, { startDate?: string; completionDate?: string }>;
}
export interface ManpowerAllocation { id: string; location: string; activity: string; trade: string; count: number; }
export interface MachineryAllocation { id: string; location: string; activity: string; machineryType: string; hoursUsed: number; }
export interface MaterialLog { id: string; particulars: string; consumedQty: number; unit: string; }
export interface SafetyIncident { id: string; severity: 'High' | 'Medium' | 'Low'; type: string; location: string; description: string; }
export interface Photo { id: string; url: string; description?: string; date?: string; }
export interface Video { id: string; url: string; }
export interface Document { id: string; url: string; name: string; }
export interface WorkProgressItem { wbsStageId: string; boqItemId: string; completedQty: number; manpower?: { id: string; trade: string; count: number }[]; machinery?: { id: string; machineryType: string; hours: number }[]; startDate?: string; endDate?: string; }
export interface Task {
    id: string; title: string; description?: string; projectId: string; assigneeIds: string[]; reporterId: string;
    status: 'To Do' | 'In Progress' | 'Done'; priority: 'High' | 'Medium' | 'Low'; dueDate: string; createdAt: string;
    wbsStageId?: string; comments?: Comment[]; dependsOn?: string[]; reminderDate?: string;
}
export interface Comment { id: string; userId: string; timestamp: string; content: string; attachment?: Attachment; }
export interface MaterialRequisition {
    id: string; requisitionCode: string; projectId: string; requesterId: string; requestDate: string; requiredByDate: string;
    status: RequisitionStatus; items: RequisitionItem[]; createdAt: string; approverId?: string; approvalDate?: string;
    remarks?: string; procurementNotes?: string; attachments?: Attachment[]; requesterRemarks?: string; reminderDate?: string;
    priority?: 'Standard' | 'High' | 'Critical'; requisitionNumber?: string; totalRequestedAmount?: number; approvedAmount?: number; notes?: string;
}
export type RequisitionStatus = 'Pending Approval' | 'Approved' | 'Rejected' | 'PO Created' | 'Ordered' | 'In RFQ' | 'Pending' | 'Partially Approved' | 'Processed';
export interface RequisitionItem {
    id: string; materialName: string; quantity: number; unit: string; estimatedRate: number;
    billId?: string; billType?: 'Vendor' | 'Subcontractor'; requestedAmount?: number; billNumber?: string; vendorName?: string; totalBillAmount?: number; balanceDue?: number; approvedAmount?: number;
}
export interface PurchaseOrder {
    id: string; poNumber: string; requisitionId?: string; projectId: string; vendorId: string; orderDate: string; expectedDeliveryDate: string;
    status: 'Draft' | 'Sent' | 'Partially Received' | 'Received' | 'Cancelled'; items: POItem[];
    subTotal: number; cgstAmount: number; sgstAmount: number; igstAmount: number; cessAmount: number; totalAmount: number;
    termsAndConditions?: string; companyGstin?: string; creatorId?: string; approverId?: string; createdAt: string; approvedAt?: string;
    otherCharges?: OtherCharge[]; attachments?: Attachment[]; poType?: 'Standard' | 'Asset';
    assetDetails?: { description: string; usefulLife: number; salvageValue: number; taxBlock: string; assetCode: string; };
}
export interface POItem { id: string; materialName: string; quantity: number; unit: string; rate: number; tax?: GstDetails; }
export interface GRN {
    id: string; grnNumber: string; poId?: string; projectId: string; receiptDate: string; receivedBy: string; items: GRNItem[];
    grnType: 'PO' | 'Manual'; manualGRNDetails?: { type: ManualGRNType; sourceProjectId?: string; challanNumber?: string; supplierName?: string; };
    challanAttachment?: Attachment;
}
export type ManualGRNType = 'Inter-Project Transfer' | 'Client Supplied Material' | 'Vendor Sample / Ad-hoc Receipt' | 'Opening Stock / Stock Correction';
export interface GRNItem { id: string; materialName: string; unit: string; orderedQty: number; acceptedQty: number; rejectedQty: number; remarks?: string; }
export interface InventoryItem { id: string; projectId: string; materialName: string; unit: string; quantityOnHand: number; }
export interface Vendor {
    id: string; name: string; contactPerson: string; email: string; phone: string; address: string; specialty: string;
    performanceRating: number; gstNumber?: string; panNumber?: string; accountId?: string; isTdsApplicable?: boolean; defaultTdsSectionId?: string;
}
export interface ProvisionalVendor { id: string; name: string; contactPerson?: string; email?: string; phone?: string; addedAt: string; }
export interface VendorInvoice {
    id: string; invoiceNumber: string; grnIds: string[]; vendorId: string; projectId: string; invoiceDate: string; dueDate: string;
    items: InvoiceItem[]; otherCharges: OtherCharge[]; subTotal: number; cgstAmount: number; sgstAmount: number; igstAmount: number;
    cessAmount: number; totalAmount: number; status: 'Draft' | 'Submitted' | 'Approved' | 'Paid' | 'Overdue' | 'Rejected';
    paymentDate?: string; paymentTransactionId?: string; amountPaid?: number; poNumbers?: string[]; companyGstin?: string;
    creatorId?: string; approverId?: string; createdAt?: string; approvedAt?: string; notes?: string; attachments?: Attachment[];
    tdsSectionId?: string; tdsAmount?: number;
}
export interface InvoiceItem { id: string; description: string; quantity?: number; unit?: string; rate?: number; amount: number; tax?: GstDetails; billedQty?: number; }
export interface OtherCharge { id: string; description: string; amount: number; tax: GstDetails; }
export interface GstDetails { cgstRate?: number; sgstRate?: number; igstRate?: number; cessRate?: number; }
export interface ClientInvoice {
    id: string; invoiceNumber: string; projectId: string; wbsStageId?: string; contractBillingStage?: string; invoiceDate: string;
    dueDate?: string; items: ClientInvoiceItem[]; subTotal: number; cgstAmount: number; sgstAmount: number; igstAmount: number;
    cessAmount: number; totalAmount: number; status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
    paymentHistory?: { date: string; amount: number; reference: string }[]; paymentDate?: string; paymentTransactionId?: string;
    companyGstin?: string; creatorId?: string; otherCharges?: OtherCharge[];
}
export interface ClientInvoiceItem {
    id: string; description: string; amount: number; tax: GstDetails; wbsStageId?: string; boqItemId?: string; billedQty?: number;
    unit?: string; rate?: number; quantity?: number; hsnCode?: string; discount?: number; finalAmount?: number; effectiveUnitRate?: number;
}
export interface Transaction {
    id: string; date: string; description: string; amount: number; type: 'Credit' | 'Debit';
    category: 'Vendor Payment' | 'Client Payment' | 'Salary' | 'Overhead' | 'Subcontractor Payment' | 'Revenue' | 'Other';
    relatedEntity?: { type: 'Project' | 'Vendor' | 'ClientInvoice' | 'VendorInvoice' | 'SubcontractBill', id: string };
    transactionReference?: string;
}
export interface Subcontractor {
    id: string; name: string; contactPerson: string; email: string; phone: string; address: string; specialty: string;
    performanceRating: number; gstNumber: string; panNumber: string; accountId?: string; isTdsApplicable?: boolean; defaultTdsSectionId?: string;
}
export interface SubcontractWorkOrder {
    id: string; workOrderNumber: string; subcontractorId: string; projectId: string; date: string;
    status: 'Draft' | 'Issued' | 'In Progress' | 'Completed'; items: SubcontractWorkOrderItem[]; subTotal: number;
    cgstAmount: number; sgstAmount: number; igstAmount: number; cessAmount: number; totalAmount: number;
    creatorId: string; approverId?: string; createdAt: string; approvedAt?: string; termsAndConditions?: string; companyGstin?: string;
}
export interface SubcontractWorkOrderItem { id: string; description: string; quantity: number; unit: string; rate: number; tax?: GstDetails; }
export interface SubcontractBill {
    id: string; billNumber: string; workOrderId: string; subcontractorId: string; projectId: string; billDate: string;
    items: SubcontractBillItem[]; subTotal: number; cgstAmount: number; sgstAmount: number; igstAmount: number;
    cessAmount: number; totalAmount: number; status: 'Submitted' | 'Approved' | 'Paid' | 'Rejected'; creatorId: string; approverId?: string;
    createdAt?: string; approvedAt?: string; paymentDate?: string; paymentTransactionId?: string; amountPaid?: number;
    tdsSectionId?: string; tdsAmount?: number; notes?: string; attachments?: Attachment[]; approverRemarks?: string; companyGstin?: string;
}
export interface SubcontractBillItem { id: string; description: string; quantity: number; unit: string; rate: number; amount: number; tax?: GstDetails; }
export interface Account { id: string; name: string; type: AccountType; subType?: 'Current' | 'Non-Current' | 'Direct' | 'Indirect'; parentId?: string; isControlAccount?: boolean; }
export type AccountType = 'Assets' | 'Liabilities' | 'Equity' | 'Income' | 'Expenses';
export interface GeneralLedger {
    [accountId: string]: {
        account: Account;
        entries: (JournalEntryDetail & { date: string, description: string, entryId: string, sourceDocument?: any, debitForDisplay?: number, creditForDisplay?: number, balance?: number })[];
        balance: number; debitTotal: number; creditTotal: number;
    };
}
export interface JournalEntry {
    id: string; date: string; description: string; details: JournalEntryDetail[]; voucherType?: 'PV' | 'RV' | 'CV' | 'JV';
    voucherNumber?: string; sourceDocument?: { type: string, id: string }; createdAt?: string; createdBy?: string;
    attachments?: Attachment[]; payeeName?: string;
}
export interface JournalEntryDetail { accountId: string; debit: number; credit: number; description?: string; }

export type PaymentRequisitionStatus = 'Pending' | 'Approved' | 'Partially Approved' | 'Rejected' | 'Processed';

export interface PaymentRequisitionItem {
    billId: string;
    billType: 'Vendor' | 'Subcontractor';
    requestedAmount: number;
    billNumber: string;
    vendorName: string;
    totalBillAmount: number;
    balanceDue: number;
    approvedAmount?: number;
}

export interface PaymentRequisition {
    id: string;
    requisitionNumber: string;
    requesterId: string;
    priority: 'Standard' | 'High' | 'Critical';
    items: PaymentRequisitionItem[];
    totalRequestedAmount: number;
    status: PaymentRequisitionStatus;
    requestDate: string;
    approvalDate?: string;
    approverId?: string;
    remarks?: string;
    approvedAmount?: number;
    notes?: string;
}

export interface PaymentExecutionItem { billId: string; amount: number; sourceAccountId: string; transactionReference: string; }
export interface FinancialSummary {
    totalPayables: number; totalOverduePayables: number; paidThisMonth: number; totalReceivables: number; totalOverdueReceivables: number;
    receivedThisMonth: number; cashFlow: Map<string, { credit: number; debit: number }>; expenseBreakdown: Map<string, number>;
    currentCashBalance: number; netCashFlowLast30Days: number; receivablesAging: { '0-30': number; '31-60': number; '61-90': number; '90+': number };
}
export interface PortfolioSummary {
    totalBudget: number; totalSpent: number; highRiskProjectsCount: number; overallScheduleVarianceDays: number;
    portfolioCompletionPercentage: number; portfolioHealth: number;
}
export interface TenderLog { id: string; date: string; title: string; notes: string; }
export interface DataBankBoqHead { id: string; description: string; }
export interface DataBankBoqSubHead { id: string; description: string; }
export interface DataBankBoqItem { id: string; description: string; unit: string; masterCode: string; }
export interface AIScheduleInsight { stageId: string; type: 'warning' | 'suggestion'; message: string; }
export interface AIEnhancedWPR {
    week: string; executiveSummary: { verdict: string; performanceVsPlan: string; financialHealth: string; lookahead: string };
    keyAccomplishments: { wbsStageId: string; description: string; progressPercentage: number; photoId?: string; category?: string }[];
    manpowerAnalysis: { summary: string; data: { trade: string; plannedManDays: number; actualManDays: number }[] };
    materialAnalysis: { summary: string; data: { material: string; unit: string; budgetedQty: number; actualQty: number }[] };
    machineryAnalysis: { summary: string; data: { machinery: string; plannedHours: number; actualHours: number }[] };
    riskAndMitigationUpdate: string; photoCaptions: { photoId: string; caption: string }[];
}
export interface AIEnhancedMPR {
    month: string; executiveSummary: { verdict: string; progressVsPlan: string; budgetVsActuals: string; risksAndOpportunities: string; lookahead: string };
    scheduleAnalysis: { aiAnalysis: string; sCurveData: { date: string; plannedValue: number; earnedValue: number; actualCost: number }[] };
    costAnalysis: { aiAnalysis: string; breakdownData: { wbsHead: string; budget: number; actual: number }[] };
    manpowerAnalysis: { summary: string; data: { trade: string; plannedManDays: number; actualManDays: number }[] };
    materialAnalysis: { summary: string; data: { material: string; unit: string; budgetedQty: number; actualQty: number }[] };
    machineryAnalysis: { summary: string; data: { machinery: string; plannedHours: number; actualHours: number }[] };
    keyAccomplishments: { wbsStageId: string; description: string; scheduleImpact: string; beforePhotoId?: string; afterPhotoId?: string }[];
    riskAnalysis: string; photoShowcase: { photoId: string; url: string; aiCaption: string }[];
}
export interface ProgressReviewMeeting {
    id: string; title: string; date: string; type: 'Weekly' | 'Monthly' | 'Special';
    clientAttendees: string[]; internalAttendees: string[]; agenda: string; discussionSummary: string;
    decisionsMade: string; actionItems: MeetingActionItem[]; momAttachment?: Attachment;
}
export interface MeetingActionItem { id: string; description: string; assigneeId: string; dueDate: string; status: 'Open' | 'In Progress' | 'Completed'; }
export interface Gstr2bRecord {
    id: string; invoiceNumber: string; invoiceDate: string; subTotal: number; totalTax: number; totalAmount: number;
    vendorName?: string; vendorGstn?: string; cgstAmount: number; sgstAmount: number; igstAmount: number; cessAmount: number;
}
export interface KpiSuggestion { roleId: string; kras: { title: string; description: string; weightage: number; kpis: { metric: string; target: string }[] }[]; }
export type EmploymentType = 'Permanent' | 'Contract' | 'Daily Wage';

export interface Employee {
    id: string; name: string; employeeCode: string; jobTitle: string; departmentId?: string; dateOfJoining: string; email?: string; contactNumber?: string;
    employmentType: EmploymentType; status: 'Active' | 'Exited' | 'On Leave'; lastWorkingDay?: string; userId?: string; avatar?: string;
    address?: string; emergencyContact?: { name: string; phone: string }; reportingTo?: string[]; panNumber?: string; aadharNumber?: string;
    pfAccountNumber?: string; uanNumber?: string; bankDetails?: { bankName: string; accountNumber: string; branch: string; ifscCode: string; };
    salary?: SalaryStructure; salaryHistory?: SalaryRevision[]; employeePayableAccountId?: string; employeeAdvanceAccountId?: string;
    kras?: KRA[]; kpis?: KPI[]; leaveBalance?: { earned: number; sick: number; casual: number }; loans?: Loan[]; documents?: EmployeeDocument[];
    panAttachment?: Attachment; aadharAttachment?: Attachment; bankAttachment?: Attachment;
}
export interface Department { id: string; name: string; code: string; headOfDepartmentId?: string; description?: string; }
export interface SalaryStructure { basic: number; components: SalaryComponent[]; pfApplicable?: boolean; ptApplicable?: boolean; }
export interface SalaryComponent { name: string; type: 'earning' | 'deduction' | 'retiral'; amount: number; isPercentage?: boolean; }
export interface SalaryRevision extends SalaryStructure { id: string; effectiveDate: string; ctc: number; hra: number; specialAllowance: number; taxRegime: 'Old' | 'New'; esicApplicable: boolean; }
export interface Loan { id: string; amount: number; disbursementDate: string; interestRate: number; tenureMonths: number; monthlyEmi: number; balance: number; status: 'Active' | 'Closed'; reason: string; }
export interface EmployeeDocument { id: string; category: 'Onboarding' | 'KYC' | 'Education' | 'Previous Employment' | 'Other'; title: string; attachment: Attachment; uploadedAt: string; uploadedBy: string; }
export interface PayrollRun {
    id: string; month: string; runDate: string; totalPayable: number; runType: 'Monthly' | 'Full & Final' | 'Ad-hoc';
    userIds?: string[]; status?: 'Draft' | 'Finalized'; journalEntryId?: string; aiSummary?: string;
}
export interface Payslip {
    id: string; userId: string; payrollRunId: string; month: string; earnings: { name: string; amount: number }[];
    deductions: { name: string; amount: number }[]; totalEarnings: number; totalDeductions: number; netPay: number;
    payableDays?: number; lopDays?: number; leaveEncashment?: number; adHoc?: any;
}
export interface AttendanceRecord { date: string; status: 'Present' | 'Absent' | 'Half Day' | 'Leave'; checkIn?: string; checkOut?: string; }
export interface LeaveRequest {
    id: string; userId: string; startDate: string; endDate: string; leaveType: 'Earned' | 'Sick' | 'Casual' | 'Unpaid';
    reason: string; status: 'Pending' | 'Approved' | 'Rejected'; requestDate: string; approverId?: string; approvedOn?: string; rejectionReason?: string;
}
export interface PolicyDocument { id: string; title: string; category: string; attachment: Attachment; }
export interface CompanyDetails {
    name: string; address: string; gstin: string[]; pan: string; contactEmail: string; contactPhone: string; logoUrl?: string;
    tdsSections: TdsSection[]; shareholders: Shareholder[]; shareParValue?: number; assetTaxBlocks: AssetTaxBlock[];
}
export interface TdsSection { id: string; sectionNumber: string; description: string; rate: number; accountId?: string; }
export interface Shareholder { id: string; name: string; accountId: string; numberOfShares: number; percentage?: number; totalBookValue?: number; }
export interface AssetTaxBlock { id: string; name: AssetTaxBlockName; rate: number; }
export type AssetTaxBlockName = 'Plant & Machinery' | 'Furniture & Fixtures' | 'Buildings' | 'Vehicles' | 'Computers';
export interface FixedAsset {
    id: string; assetCode: string; name: string; purchaseDate: string; purchaseCost: number; usefulLife: number;
    salvageValue: number; depreciationMethod: 'Straight-Line' | 'WDV'; assetAccountId: string; accumulatedDepreciationAccountId: string;
    taxBlock: AssetTaxBlockName; status: 'Active' | 'Sold' | 'Scrapped'; saleDate?: string; saleConsideration?: number;
}
export interface Challan { id: string; challanNo: string; paymentDate: string; tdsSectionId: string; amount: number; relevantMonth: string; attachment: Attachment | null; }
export interface QuarterlyReturn { id: string; quarter: string; filingDate: string; acknowledgementNo: string; attachment: Attachment | null; }
export interface TdsSectionSummary { sectionId: string; section: string; description: string; totalTaxableAmount: number; totalTdsAmount: number; parties: TdsPartySummary[]; }
export interface TdsPartySummary { partyId: string; partyName: string; partyDetails: any; taxableAmount: number; tdsAmount: number; bills: any[]; }
export interface GstFilingData { filingDate?: string; acknowledgementDoc?: Attachment; returnDoc?: Attachment; finalized?: boolean; finalizedAt?: string; revisionRequestedBy?: string; revisionRequestedAt?: string; revisionApprovedBy?: string; revisionApprovedAt?: string; }
export interface GstReconData { finalized: boolean; finalizedAt?: string; revisionRequestedBy?: string; revisionRequestedAt?: string; revisionApprovedBy?: string; revisionApprovedAt?: string; }
export interface GstReconSummaryData { matchedItc: number; mismatchedItc: number; missingIn2bItc: number; missingInBooksItc: number; mismatchedInvoices: { invoiceNumber: string; discrepancies: string[] }[]; missingIn2bInvoices: { invoiceNumber: string }[]; }
export interface PandLStatement {
    income: PandLItem[]; totalIncome: number; priorTotalIncome?: number; directExpenses: PandLItem[]; totalDirectExpenses: number;
    priorTotalIncome?: number; grossProfit: number; priorGrossProfit?: number; indirectExpenses: PandLItem[];
    totalIndirectExpenses: number; priorTotalIndirectExpenses?: number; netProfit: number; priorNetProfit?: number; quarterlyProfit?: { quarter: string; profit: number }[];
}
export interface PandLItem { name: string; amount: number; priorAmount?: number; }
export interface BalanceSheet {
    assets: { current: BalanceSheetItem[]; nonCurrent: BalanceSheetItem[]; totalCurrentAssets: number; totalNonCurrentAssets: number; totalAssets: number; priorTotalCurrentAssets?: number; priorTotalNonCurrentAssets?: number; priorTotalAssets?: number; };
    liabilitiesAndEquity: { currentLiabilities: BalanceSheetItem[]; nonCurrentLiabilities: BalanceSheetItem[]; equity: BalanceSheetItem[]; totalCurrentLiabilities: number; totalNonCurrentLiabilities: number; totalEquity: number; totalLiabilitiesAndEquity: number; priorTotalCurrentLiabilities?: number; priorTotalNonCurrentLiabilities?: number; priorTotalEquity?: number; priorTotalLiabilitiesAndEquity?: number; };
}
export interface BalanceSheetItem { accountId: string; name: string; amount: number; priorAmount?: number; children?: BalanceSheetItem[]; isControlAccount?: boolean; }
export interface CashFlowStatement { netIncome: number; depreciation: number; changeInAccountsReceivable: number; changeInInventory: number; changeInAccountsPayable: number; cashFromOperations: number; cashFromInvesting: number; cashFromFinancing: number; netChangeInCash: number; beginningCash: number; endingCash: number; }
export interface FinancialRatios { netProfitMargin: number; grossProfitMargin: number; currentRatio: number; debtToEquityRatio: number; }
export interface TrialBalanceLine { accountId: string; accountName: string; debit: number; credit: number; }
export interface AIEnhancedProjectSummary { healthAssessment: string; financials: string; schedule: string; risks: string; recommendation: string; }
export interface RFQ { id: string; rfqNumber: string; projectIds: string[]; requisitionIds: string[]; vendorIds: string[]; status: 'Draft' | 'Sent' | 'Closed'; createdAt: string; deadline?: string; subject: string; rfqType: 'Standard' | 'Capex / Asset' | 'Raw Material - Bulk' | 'Services / Labour'; termsAndConditions?: string; notes?: string; }
export interface Quotation { id: string; rfqId: string; vendorId: string; quoteNumber: string; quoteDate: string; items: QuotationItem[]; freight: number; packingForwarding: number; loadingUnloading: number; otherCharges: OtherCharge[]; paymentTerms: string; deliveryTerms: string; validityDate: string; totalAmount: number; status: 'Received' | 'Selected' | 'Rejected'; vendorReference?: string; isInclusiveTax?: boolean; internalNotes?: string; attachments?: Attachment[]; }
export interface QuotationItem {
    id: string;
    requisitionItemId: string;
    materialName: string;
    quantity: number;
    unit: string;
    rate: number;
    discount: number;
    amount: number;
    finalAmount: number;
    gst: number;
    tax?: GstDetails;
    effectiveUnitRate: number;
    hsnCode?: string;
}
export interface ComparativeStatement { id: string; rfqId: string; quotationIds: string[]; generatedAt: string; status: 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected' | 'PO_Created'; finalizedBy?: string; finalizedAt?: string; finalizationRemarks?: string; approvedBy?: string; approvedAt?: string; approvalNotes?: string; rejectionRemarks?: string; selectionType?: 'Single' | 'Split' | 'ItemWise'; selectedQuotationId?: string; splitDetails?: { quotationId: string; quantity: number }[]; itemAllocations?: Record<string, { quotationId: string; quantity: number }[]>; }
export interface CSItemComparison { requisitionItemId: string; materialName: string; quantity: number; unit: string; budgetRate: number; lastPurchaseRate: number; }
export interface MaterialForecast { month: string; forecastedQuantity: number; }
export interface AIEquityAnalysis { headline: string; insights: { category: string; text: string }[]; }
export interface LandingPageData { globalHighlights: string[]; heroTitle: string; heroSubtitle: string; heroImages: string[]; aboutTitle: string; aboutSubtitle: string; aboutParagraph1: string; aboutParagraph2: string; aboutVision: string; aboutMission: string; aboutBgImage: string; sustainabilityTitle: string; sustainabilitySubtitle: string; sustainabilityDescription: string; sustainabilityMetrics: SustainabilityMetric[]; complianceSdgs: SustainabilityGoal[]; impactSdgs: SustainabilityGoal[]; sustainabilityBgImage: string; servicesTitle: string; servicesSubtitle: string; services: Service[]; strengthsTitle: string; strengths: Strength[]; strengthsBgImage: string; leadershipTitle: string; leadershipSubtitle: string; leadershipBgImage: string; leadership: Leader[]; featuredProjectsTitle: string; featuredProjects: FeaturedProject[]; clientsTitle: string; clientsSubtitle: string; clients: ClientLogo[]; consultantsTitle: string; consultantsSubtitle: string; consultants: ConsultantLogo[]; contactTitle: string; contactRegisteredOfficeTitle: string; contactRegisteredOfficeAddress: string; contactGeneralTitle: string; contactGeneralEmail: string; contactGeneralPhone: string; contactMapUrl: string; contactBgImage: string; }
export interface Service { id: string; title: string; description: string; longDescription: string; icon: string; image: string; features: string[]; }
export interface Strength { id: string; title: string; statistic: string; description: string; icon: string; image: string; }
export interface Leader { id: string; name: string; title: string; experience: string; photo: string; linkedinUrl: string; twitterUrl: string; }
export interface ClientLogo { id: string; name: string; logo: string; }
export interface ConsultantLogo { id: string; name: string; logo: string; }
export interface FeaturedProject { id: string; name: string; client: string; image: string; }
export interface SustainabilityMetric { id: string; label: string; value: string; }
export interface SustainabilityGoal { id: string; goalNumber: number; title: string; description: string; actionTag: string; color: string; image: string; }
export interface CalendarEvent { id: string; title: string; start: Date; end: Date; type: 'task' | 'milestone' | 'delivery' | 'requisition'; data: any; }
export type CalendarViewType = 'month' | 'week' | 'day' | 'agenda';
export interface CalendarConflict { date: string; description: string; relatedEventIds: string[]; }
export interface Channel { id: string; name: string; type: 'project' | 'direct'; projectId?: string; memberIds: string[]; hiddenForUserIds?: string[]; }
export interface Message { id: string; channelId: string; userId: string; content: string; timestamp: string; attachments?: Attachment[]; }
export interface AIFullInsightResponse { verdict: string; insights: AIInsightItem[]; }
export interface AIInsightItem { category: 'Financial' | 'Schedule' | 'Risk' | 'Opportunity'; headline: string; details: string; severity: 'High' | 'Medium' | 'Low'; actionableLink: AIInsightActionableLink; }
export interface AIInsightActionableLink { view: View; filter?: any; }
export interface AIHumanCapitalSummary { executiveSummary: string; insights: AIHumanCapitalInsight[]; }
export interface AIHumanCapitalInsight { category: 'Performance' | 'Attendance' | 'Cost' | 'Retention' | 'General'; insight: string; severity: 'High' | 'Medium' | 'Low'; }
export interface AiSearchResponse { summary: string; results: AiSearchResultItem[]; }
export interface AiSearchResultItem { id?: string; type: 'project' | 'task' | 'user' | 'navigation' | 'answer'; title: string; details?: string; view?: View; }
export interface MaterialInsight { headline: string; details: string; priority: 'High' | 'Medium' | 'Low'; type: 'risk' | 'recommendation' | 'prediction' | 'opportunity'; }
export interface AIResourceInsight {
    type: 'trend' | 'anomaly' | 'forecast' | 'cost' | 'rootCause' | 'recommendation';
    headline: string;
    details: string;
    priority?: 'High' | 'Medium' | 'Low';
}

export type ActivityAction = 'PROJECT_CREATED' | 'TASK_COMPLETED' | 'RISK_IDENTIFIED' | 'USER_INVITED' | 'COMMENT_ADDED' | 'DPR_SUBMITTED' | 'create_vendor' | 'update_vendor' | 'rate_vendor' | 'delete_vendor' | 'PAYMENT_PROCESSED';

export interface ActivityLog {
    id: string;
    userId: string;
    action: ActivityAction;
    details: {
        entityType: string;
        entityName?: string;
        changeDescription?: string;
    };
    timestamp: string;
}