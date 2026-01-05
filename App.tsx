

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useProjectData } from './hooks/useProjectData';
import { useUserData } from './hooks/useUserData';
import { useTaskData } from './hooks/useTaskData';
import { useProcurementData } from './hooks/useProcurementData';
import { useInventoryData } from './hooks/useInventoryData';
import { useAccountsData } from './hooks/useAccountsData';
import { useVendorData } from './hooks/useVendorData';
import { useSubcontractorData, INITIAL_SUBCONTRACT_TRANSACTIONS } from './hooks/useSubcontractorData';
import { useActivityLog } from './hooks/useActivityLog';
import { useBoqDataBank } from './hooks/useBoqDataBank';
import { useHRData } from './hooks/useHRData';
import { useToast } from './hooks/useToast';
import ToastContainer from './components/ui/ToastContainer';
import { useLedger } from './hooks/useLedgerData';
import { ACCOUNT_CODES } from './data/chartOfAccounts';
import { usePayrollData } from './hooks/usePayrollData';
import { useCompanyData } from './hooks/useCompanyData';
import { useFixedAssetData } from './hooks/useFixedAssetData';
import { useTdsData } from './hooks/useTdsData';
import { usePaymentRequisition } from './hooks/usePaymentRequisition';
import { useGstData } from './hooks/useGstData';


import Sidebar from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import Dashboard from './views/Dashboard';
import Reports from './views/Reports';
import Planning from './views/Planning';
import Tendering from './views/Tendering';
import ProjectControlCenter from './views/ProjectControlCenter';
import Users from './views/Users';
import HR from './views/HR';
import ESS from './views/ESS';
import Activity from './views/Activity';
import Tasks from './views/Tasks';
import DPR from './views/DPR';
import Collaboration from './views/Collaboration';
import Payables from './views/Payables';
import Receivables from './views/Receivables';
import AccountsView from './views/AccountsView';
import GST from './views/GST';
import Calendar from './views/Calendar';
import Login from './views/Login';
import Financials from './views/Financials';
import SupplyChain from './views/SupplyChain';
import SubcontractsView from './views/Subcontracts';

import ChartOfAccountsView from './views/ChartOfAccountsView';
import GeneralLedgerView from './views/GeneralLedgerView';
import Payroll from './views/Payroll';
import FinancialReportingView from './views/FinancialReportingView';
import ProjectProfitabilityView from './views/ProjectProfitabilityView';
import EquityReportingView from './views/EquityReportingView';
import CompanySettings from './views/CompanySettings';
import LandingPage from './views/LandingPage';
import MaterialManagement from './views/MaterialManagement';
import TdsCompliance from './views/TdsCompliance';
import LandingPageSettings from './views/LandingPageSettings';
import UserManual from './views/UserManual';
import FixedAssetRegisterView from './views/FixedAssetRegisterView';
import TaxDepreciationView from './views/TaxDepreciationView';
import CashFlowForecastView from './views/CashFlowForecastView';
import BudgetVsActualsView from './views/BudgetVsActualsView';
import EbitdaReportingView from './views/EbitdaReportingView';
import RatioAnalysisView from './views/RatioAnalysisView';
import ProcurementModule from './views/ProcurementModule';
import QualityControl from './views/QualityControl';


import NewProjectModal from './components/modals/NewProjectModal';
import EditProjectModal from './components/modals/EditProjectModal';
import AwardProjectModal from './components/modals/AwardProjectModal';
import TaskDetailModal from './components/modals/TaskDetailModal';
import CreateTaskModal from './components/modals/CreateTaskModal';
import CreateRequisitionModal from './components/modals/CreateRequisitionModal';
import RequisitionDetailModal from './components/modals/RequisitionDetailModal';
import CreatePOModal from './components/modals/CreatePOModal';
import PODetailModal from './components/modals/PODetailModal';
import VendorDetailModal from './components/modals/VendorDetailModal';
import CreateGRNModal from './components/modals/CreateGRNModal';

import CreateManualGRNModal from './components/modals/CreateManualGRNModal.tsx';
import { GRNDetailModal } from './components/modals/GRNDetailModal.tsx';
import InventoryDetailModal from './components/modals/InventoryDetailModal.tsx';
import CreateVendorInvoiceModal from './components/modals/CreateVendorInvoiceModal.tsx';
import VendorInvoiceDetailModal from './components/modals/VendorInvoiceDetailModal.tsx';
import RecordVendorPaymentModal from './components/modals/RecordVendorPaymentModal.tsx';
import AddTransactionModal from './components/modals/AddTransactionModal.tsx';
import VendorLedgerModal from './components/modals/VendorLedgerModal.tsx';
import PaymentAdviceModal from './components/modals/PaymentAdviceModal.tsx';
import CreateClientInvoiceModal from './components/modals/CreateClientInvoiceModal.tsx';
import ClientInvoiceDetailModal from './components/modals/ClientInvoiceDetailModal.tsx';
import RecordClientPaymentModal from './components/modals/RecordClientPaymentModal.tsx';
import ClientLedgerModal from './components/modals/ClientLedgerModal.tsx';
import { generateDailyNote, generateKpiSuggestions } from './services/geminiService.ts';
import SearchModal from './components/modals/SearchModal.tsx';
import AddGstr2bRecordModal from './components/modals/AddGstr2bRecordModal.tsx';
import KpiSuggestionModal from './components/modals/KpiSuggestionModal.tsx';
import { useGstr3bData } from './hooks/useGstr3bData.ts';
import { useGstFilingData } from './hooks/useGstFilingData';
import { formatCurrencyINR } from './utils/formatting';
import { PaymentVoucherModal } from './components/modals/PaymentVoucherModal';
import GeneralPaymentAdviceModal from './components/modals/GeneralPaymentAdviceModal';
import SubcontractorDetailModal from './components/modals/SubcontractorDetailModal';
import SubcontractorLedgerModal from './components/modals/SubcontractorLedgerModal';
import SubcontractorWorkOrderModal from './components/modals/SubcontractorWorkOrderModal';
import { SubcontractorBillModal } from './components/modals/SubcontractorBillModal';
import RecordSubcontractorPaymentModal from './components/modals/RecordSubcontractorPaymentModal';
import EmployeeLedgerModal from './components/modals/EmployeeLedgerModal';
import AddCapitalContributionModal from './components/modals/AddCapitalContributionModal';
import OpeningBalanceModal from './components/modals/OpeningBalanceModal';

import AddAssetModal from './components/modals/AddAssetModal';
import AssetDetailModal from './components/modals/AssetDetailModal';
import RunAnnualDepreciationModal from './components/modals/RunDepreciationModal';
import SellAssetModal from './components/modals/SellAssetModal';
import DprReviewModal from './components/modals/DprReviewModal';
import AccountLedgerModal from './components/modals/AccountLedgerModal';
import { RecordPrmModal } from './components/modals/RecordPrmModal';

import { format } from 'date-fns';
import type { View, Project, Task, MaterialRequisition, PurchaseOrder, GRN, VendorInvoice, ClientInvoice, WBSStage, Attachment, DailyProgress, User, RequisitionItem, Transaction, MaterialLog, Gstr2bRecord, KpiSuggestion, KRA, KPI, JournalEntry, JournalEntryDetail, Subcontractor, SubcontractWorkOrder, SubcontractBill, GeneralLedger, Shareholder, FixedAsset, AIEnhancedWPR, AIEnhancedMPR, ProgressReviewMeeting, PaymentRequisition, PaymentExecutionItem, Vendor, BOQItem } from './types';


const viewToPath: Record<View, string> = {
    dashboard: 'dashboard',
    reports: 'reports',
    planning: 'planning',
    tendering: 'tendering',
    projectControl: 'project-control',
    users: 'users',
    hr: 'hr',
    ess: 'ess',
    activity: 'activity',
    tasks: 'tasks',
    dpr: 'dpr',
    collaboration: 'collaboration',
    payables: 'payables',
    receivables: 'receivables',
    accounts: 'accounts',
    gst: 'gst',
    calendar: 'calendar',
    financials: 'financials',
    supplyChain: 'supply-chain',
    subcontracts: 'subcontracts',
    chartOfAccounts: 'chart-of-accounts',
    ledger: 'ledger',
    payroll: 'payroll',
    financialReporting: 'financial-reporting',
    projectProfitability: 'project-profitability',
    equityReporting: 'equity-reporting',
    companySettings: 'company-settings',
    landingPageSettings: 'landing-page-settings',
    materialManagement: 'material-management',
    tdsCompliance: 'tds-compliance',
    userManual: 'user-manual',
    fixedAssetRegister: 'fixed-asset-register',
    taxDepreciation: 'tax-depreciation',
    cashFlowForecast: 'cash-flow-forecast',
    budgetVsActuals: 'budget-vs-actuals',
    ebitdaReporting: 'ebitda-reporting',
    ratioAnalysis: 'ratio-analysis',
    procurement: 'procurement',
    qualityControl: 'quality-control'
};

const ProtectedRoute: React.FC<{ children: React.ReactNode; user: User | null }> = ({ children, user }) => {
    const location = useLocation();
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <>{children}</>;
};

const App: React.FC = () => {

    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const location = useLocation();
    const navigate = useNavigate();

    const [currentView, setCurrentView] = useState<View>('dashboard');
    const [isAIGenerating, setIsAIGenerating] = useState(false);
    const [appEntered, setAppEntered] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loginError, setLoginError] = useState<string | null>(null);

    // Sync URL to State on mount and location change
    useEffect(() => {
        const path = location.pathname;
        if (path === '/') {
            setAppEntered(false);
        } else if (path === '/login') {
            setAppEntered(true);
        } else if (path.startsWith('/app/')) {
            const viewPath = path.replace('/app/', '');
            const view = Object.entries(viewToPath).find(([v, p]) => p === viewPath)?.[0] as View;
            if (view) {
                setAppEntered(true);
                setCurrentView(view);
            } else {
                navigate('/app/dashboard', { replace: true });
            }
        }

    }, [location.pathname]);

    // Global states

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [dashboardSelectedProjectIds, setDashboardSelectedProjectIds] = useState<string[]>([]);
    const [hoveredWbsStageId, setHoveredWbsStageId] = useState<string | null>(null);

    // State Hooks
    const { users, roles, ...userActions } = useUserData();
    const { projects, setProjects, portfolioSummary } = useProjectData();
    const projectData = { projects, portfolioSummary };
    const { tasks, setTasks } = useTaskData();
    const { requisitions, purchaseOrders, ...procurementActions } = useProcurementData(users);
    const { inventory, grns, ...inventoryActions } = useInventoryData(projects);
    const vendorActions = useVendorData();
    const { vendors, provisionalVendors, addVendor, addProvisionalVendor, promoteProvisionalVendor, updateVendor, deleteVendor } = vendorActions;


    const { activityLog, logActivity } = useActivityLog();
    const dataBank = useBoqDataBank();
    const hrData = useHRData();
    const { generalLedger, addAccount, chartOfAccounts, deleteAccount, addJournalEntry, journalEntries, accountsMap } = useLedger();
    const { companyDetails, updateCompanyDetails } = useCompanyData();

    const { vendorInvoices, clientInvoices, transactions, financialSummary, addTransaction, updateVendorInvoice, ...accountsActions } = useAccountsData(
        projects,
        purchaseOrders,
        vendors,
        addJournalEntry,
        users,
        INITIAL_SUBCONTRACT_TRANSACTIONS,
        companyDetails.tdsSections,
        chartOfAccounts
    );

    const { subcontractors, subcontractorsMap, workOrders, bills, ...subcontractorActions } = useSubcontractorData(
        users,
        addJournalEntry,
        addTransaction,
        companyDetails.tdsSections,
        projects
    );

    const { paymentRequisitions, createRequisition, updateRequisitionStatus } = usePaymentRequisition();

    const payrollData = usePayrollData(addJournalEntry);
    const gstr3bClaimedData = useGstr3bData(vendorInvoices);
    const { gstr1FilingData, updateGstr1Filing, gstr3bFilingData, updateGstr3bFiling, gstr2bReconData, finalizeGstr2bReconciliation, requestGstr2bRevision, approveGstr2bRevision, finalizeGstr1, requestGstr1Revision, approveGstr1Revision, finalizeGstr3b, requestGstr3bRevision, approveGstr3bRevision } = useGstFilingData();

    const { challans, setChallans, quarterlyReturns, setQuarterlyReturns, monthlySummaries, setMonthlySummaries } = useTdsData();

    // GST State
    const initialGstData = useGstData(vendorInvoices, vendors);
    const [gstr2bPortalData, setGstr2bPortalData] = useState<Gstr2bRecord[]>(initialGstData);

    // Effect to sync GST data if initial state was empty due to async loading
    useEffect(() => {
        if (initialGstData.length > 0 && gstr2bPortalData.length === 0) {
            setGstr2bPortalData(initialGstData);
        }
    }, [initialGstData, gstr2bPortalData.length]);

    // Fixed Asset Register states and hooks
    const [addAssetModalOpen, setAddAssetModalOpen] = useState(false);
    const [viewingAsset, setViewingAsset] = useState<FixedAsset | null>(null);
    const [runAnnualDepreciationModalOpen, setRunAnnualDepreciationModalOpen] = useState(false);
    const [sellingAsset, setSellingAsset] = useState<FixedAsset | null>(null);

    const { fixedAssets, addAsset, runAnnualDepreciation, depreciationLog, sellAsset } = useFixedAssetData(
        chartOfAccounts,
        addAccount,
        addJournalEntry
    );

    const [dprForReview, setDprForReview] = useState<{ projectId: string; dpr: DailyProgress; consumedMaterials: MaterialLog[]; } | null>(null);

    // Enhanced user invite handler to include account creation
    const handleUserInvite = useCallback((details: { email: string, roleId: string, reportingTo?: string[], jobTitle: string, dateOfJoining: string }) => {
        userActions.onUserInvite(details, addAccount, chartOfAccounts);
    }, [userActions, addAccount, chartOfAccounts]);

    const toast = useToast();

    const bankAccounts = useMemo(() => {
        const groupCode = ACCOUNT_CODES.CASH_AND_BANK_GROUP || '1010';
        return chartOfAccounts.filter(acc => acc.parentId === groupCode && !acc.isControlAccount);
    }, [chartOfAccounts]);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    useEffect(() => {
        document.title = "Infratech AI";
    }, []);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    // Search shortcut
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault();
                setIsSearchOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleSetCurrentView = useCallback((view: View) => {
        if (currentView === 'dashboard' && view !== 'dashboard') {
            setDashboardSelectedProjectIds([]);
        }
        setCurrentView(view);
        navigate(`/app/${viewToPath[view]}`);
    }, [currentView, navigate]);


    const handleLogin = (email: string, password: string) => {
        // Access is disabled as per user request
        setLoginError("Access denied for now.");
        toast.error("Access denied for now.");
    };


    const handleLogout = () => {
        setCurrentUser(null);
        setAppEntered(false);
        toast.info("You have been successfully logged out.");
        navigate('/');
    };


    const handleSwitchUser = useCallback((userId: string) => {
        const user = users.find(u => u.id === userId);
        if (user) {
            setCurrentUser(user);
            toast.success(`Logged in as ${user.name}.`);
        } else {
            toast.error("User not found.");
        }
    }, [users, toast]);

    // Modal States
    const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [awardingProject, setAwardingProject] = useState<Project | null>(null);
    const [viewingTask, setViewingTask] = useState<Task | null>(null);
    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
    const [createTaskInitialData, setCreateTaskInitialData] = useState<Partial<Omit<Task, 'id' | 'reporterId' | 'createdAt'>> | undefined>(undefined);
    const [isCreateRequisitionModalOpen, setIsCreateRequisitionModalOpen] = useState(false);
    const [createRequisitionInitialData, setCreateRequisitionInitialData] = useState<any>(null);
    const [viewingRequisition, setViewingRequisition] = useState<MaterialRequisition | null>(null);
    const [creatingPOForReq, setCreatingPOForReq] = useState<MaterialRequisition | null>(null);
    const [isStandalonePOCreation, setIsStandalonePOCreation] = useState(false);
    const [createPOFromCSData, setCreatePOFromCSData] = useState<any>(null);
    const [viewingPO, setViewingPO] = useState<PurchaseOrder | null>(null);
    const [viewingVendor, setViewingVendor] = useState<Vendor | null>(null);
    const [vendorModalMode, setVendorModalMode] = useState<'view' | 'edit' | 'create'>('view');
    const [creatingGRNForPO, setCreatingGRNForPO] = useState<PurchaseOrder | null>(null);
    const [isCreateManualGRNModalOpen, setIsCreateManualGRNModalOpen] = useState(false);
    const [viewingGRN, setViewingGRN] = useState<GRN | null>(null);
    const [isInventoryDetailOpen, setIsInventoryDetailOpen] = useState(false);
    const [vendorInvoiceModalState, setVendorInvoiceModalState] = useState<{ initialGrn?: GRN; initialGstr2b?: Gstr2bRecord; } | 'standalone' | null>(null);
    const [viewingVendorInvoice, setViewingVendorInvoice] = useState<{ invoice: VendorInvoice; gstr2bRecord?: Gstr2bRecord } | null>(null);
    const [recordingPaymentForInvoice, setRecordingPaymentForInvoice] = useState<VendorInvoice | null>(null);
    const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
    const [addTransactionDefaultType, setAddTransactionDefaultType] = useState<'Credit' | 'Debit'>('Credit');
    const [viewingVendorLedger, setViewingVendorLedger] = useState<Vendor | null>(null);
    const [viewingPaymentAdvice, setViewingPaymentAdvice] = useState<Transaction | null>(null);
    const [isAddGstr2bModalOpen, setIsAddGstr2bModalOpen] = useState(false);
    const [isOpeningBalanceModalOpen, setIsOpeningBalanceModalOpen] = useState(false);
    const [prmModalState, setPrmModalState] = useState<{ isOpen: boolean; project?: Project }>({ isOpen: false });

    // New Receivables Modals
    const [isCreateClientInvoiceOpen, setIsCreateClientInvoiceOpen] = useState(false);
    const [preselectedInvoiceData, setPreselectedInvoiceData] = useState<{ project: Project; stage: WBSStage; } | null>(null);
    const [viewingClientInvoice, setViewingClientInvoice] = useState<ClientInvoice | null>(null);
    const [recordingClientPayment, setRecordingClientPayment] = useState<ClientInvoice | null>(null);
    const [viewingClientLedger, setViewingClientLedger] = useState<string | null>(null);

    // Kpi Suggestion Modal States
    const [isKpiSuggestionModalOpen, setIsKpiSuggestionModalOpen] = useState(false);
    const [kpiSuggestionUser, setKpiSuggestionUser] = useState<User | null>(null);
    const [kpiSuggestions, setKpiSuggestions] = useState<KpiSuggestion | null>(null);

    // New unified voucher modal state
    const [createVoucherState, setCreateVoucherState] = useState<{ isOpen: boolean, initialType?: JournalEntry['voucherType'] }>({ isOpen: false });
    const [viewingGeneralAdvice, setViewingGeneralAdvice] = useState<JournalEntry | null>(null);

    // New Subcontractor Modals
    const [viewingSubcontractor, setViewingSubcontractor] = useState<Subcontractor | null>(null);
    const [subcontractorModalMode, setSubcontractorModalMode] = useState<'view' | 'edit' | 'create'>('view');
    const [viewingSubcontractorLedger, setViewingSubcontractorLedger] = useState<Subcontractor | null>(null);
    const [scWorkOrderModal, setScWorkOrderModal] = useState<{ mode: 'create' | 'view'; data?: SubcontractWorkOrder } | null>(null);
    const [scBillModal, setScBillModal] = useState<{ mode: 'create' | 'view'; data?: SubcontractBill, initialWO?: SubcontractWorkOrder } | null>(null);
    const [recordingScPayment, setRecordingScPayment] = useState<SubcontractBill | null>(null);
    const [viewingEmployeeLedger, setViewingEmployeeLedger] = useState<User | null>(null);
    const [isCapitalContributionModalOpen, setIsCapitalContributionModalOpen] = useState(false);

    // New generic ledger modal state
    const [viewingAccountLedger, setViewingAccountLedger] = useState<GeneralLedger[string] | null>(null);

    // Handler to open the generic account ledger
    const handleViewAccountLedger = useCallback((accountId: string) => {
        const ledger = generalLedger[accountId];
        if (ledger) {
            setViewingVendorLedger(null);
            setViewingClientLedger(null);
            setViewingSubcontractorLedger(null);
            setViewingEmployeeLedger(null);
            setViewingAccountLedger(ledger);
        } else {
            toast.error(`Ledger for account ID ${accountId} not found.`);
        }
    }, [generalLedger, toast]);

    // Handler to view voucher (Journal Entry) details
    const handleViewVoucher = useCallback((journalEntryId: string) => {
        const entry = journalEntries.find(je => je.id === journalEntryId);
        if (entry) {
            setViewingGeneralAdvice(entry);
        } else {
            toast.error("Voucher not found.");
        }
    }, [journalEntries, toast]);

    // Sub-view states
    const [planningTab, setPlanningTab] = useState('boq');

    const handleAddGstr2bRecord = useCallback((record: Gstr2bRecord) => {
        setGstr2bPortalData(prev => [...prev, record]);
        toast.success(`Record ${record.invoiceNumber} added to GSTR-2B data.`);
    }, [toast]);


    const calendarEvents = useMemo(() => {
        const taskEvents = tasks.map(t => ({ id: `task-${t.id}`, title: t.title, start: new Date(t.dueDate), end: new Date(t.dueDate), type: 'task' as const, data: t }));
        const milestoneEvents = projects.flatMap(p => p.milestones.map(m => ({ id: `milestone-${m.id}`, title: `${p.name}: ${m.name}`, start: new Date(m.plannedDate), end: new Date(m.plannedDate), type: 'milestone' as const, data: m })));
        const deliveryEvents = purchaseOrders.map(po => ({ id: `delivery-${po.id}`, title: `Delivery for ${po.poNumber}`, start: new Date(po.expectedDeliveryDate), end: new Date(po.expectedDeliveryDate), type: 'delivery' as const, data: po }));
        const requisitionEvents = requisitions.map(r => ({ id: `req-${r.id}`, title: `Materials required for ${r.requisitionCode}`, start: new Date(r.requiredByDate), end: new Date(r.requiredByDate), type: 'requisition' as const, data: r }));
        return [...taskEvents, ...milestoneEvents, ...deliveryEvents, ...requisitionEvents];
    }, [tasks, projects, purchaseOrders, requisitions]);

    // Memoized Handlers for Performance
    const handleOpenNewProjectModal = useCallback(() => setIsNewProjectModalOpen(true), []);

    const handleCreateProject = useCallback((details: { name: string; client: string; }) => {
        const newProject: Project = {
            id: `proj-${Date.now()}`,
            ...details,
            status: 'Planning',
            budget: 0, spent: 0,
            bidAmount: 0,
            profitMargin: 15,
            milestones: [], risks: [], dailyProgress: [], boq: [], overheads: [], wbs: [],
            generatedWprs: [],
            generatedMprs: [],
            prms: [],
            tenderDocuments: [],
            tenderLogs: [],
            billingPattern: 'itemized', // Default
        };
        setProjects(prev => [newProject, ...prev]);
        logActivity(currentUser!.id, 'PROJECT_CREATED', { entityType: 'Project', entityName: newProject.name });
        toast.success(`Project "${newProject.name}" created.`);
        setIsNewProjectModalOpen(false);
    }, [setProjects, logActivity, currentUser, toast]);

    const handleUpdateProject = useCallback((projectId: string, updates: Partial<Project>) => {
        setProjects(prev => prev.map(p => p.id === projectId ? { ...p, ...updates } : p));
        toast.success('Project updated.');
        setEditingProject(null);
    }, [setProjects, toast]);

    const handleDeleteProject = useCallback((projectId: string) => {
        setProjects(prev => prev.filter(p => p.id !== projectId));
        toast.info('Project deleted.');
    }, [setProjects, toast]);

    const handleAwardProject = useCallback((details: {
        projectId: string;
        startDate: string;
        endDate?: string;
        budget: number;
        loiDocument?: Attachment;
        workOrderDocument?: Attachment;
        billingDetails?: { address: string; gst: string; pan?: string; };
        locationDetails?: { address: string; googleMapsLink?: string; };
        clientContactDetails?: { name: string; email: string; phone: string; };
        otherAwardDetails?: string;
    }) => {
        const projectToAward = projects.find(p => p.id === details.projectId);
        if (projectToAward) {
            const clientName = projectToAward.client;
            const clientAccountExists = chartOfAccounts.some(acc =>
                acc.parentId === ACCOUNT_CODES.ACCOUNTS_RECEIVABLE &&
                acc.name.toLowerCase() === clientName.toLowerCase()
            );

            if (!clientAccountExists) {
                const receivableSubAccounts = chartOfAccounts.filter(acc => acc.parentId === ACCOUNT_CODES.ACCOUNTS_RECEIVABLE);
                const lastSubAccountNum = receivableSubAccounts.reduce((max, acc) => {
                    if (!acc || typeof acc.id !== 'string' || !acc.id.includes('.')) return max;
                    const num = parseInt(acc.id.split('.')[1], 10);
                    return !isNaN(num) && num > max ? num : max;
                }, 0);
                const newAccountId = `${ACCOUNT_CODES.ACCOUNTS_RECEIVABLE}.${(lastSubAccountNum + 1).toString().padStart(2, '0')}`;

                addAccount({
                    id: newAccountId,
                    name: clientName,
                    type: 'Assets',
                    subType: 'Current',
                    parentId: ACCOUNT_CODES.ACCOUNTS_RECEIVABLE
                });
                toast.info(`New client ledger created for ${clientName}.`);
            }
        }

        setProjects(prev => prev.map(p => {
            if (p.id === details.projectId) {
                return {
                    ...p,
                    status: 'On Track',
                    startDate: details.startDate,
                    endDate: details.endDate,
                    budget: details.budget,
                    loiDocument: details.loiDocument,
                    workOrderDocument: details.workOrderDocument,
                    billingDetails: details.billingDetails,
                    locationDetails: details.locationDetails,
                    clientContactDetails: details.clientContactDetails,
                    otherAwardDetails: details.otherAwardDetails,
                };
            }
            return p;
        }));
        toast.success('Project awarded and moved to execution.');
        setAwardingProject(null);
    }, [projects, setProjects, toast, addAccount, chartOfAccounts]);

    const handleUpdateTask = useCallback((taskId: string, updates: Partial<Task>) => {
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updates } : t));
    }, [setTasks]);

    const handleOpenCreateTask = useCallback((initialData?: Partial<Omit<Task, 'id' | 'reporterId' | 'createdAt'>>) => {
        setCreateTaskInitialData(initialData);
        setIsCreateTaskModalOpen(true);
    }, []);

    const handleCreateTask = useCallback((taskData: Omit<Task, 'id' | 'reporterId' | 'createdAt'>) => {
        const newTask: Task = {
            ...taskData,
            id: `task-${Date.now()}`,
            reporterId: currentUser!.id,
            createdAt: new Date().toISOString(),
        };
        setTasks(prev => [newTask, ...prev]);
        toast.success(`Task "${newTask.title}" created.`);
        setIsCreateTaskModalOpen(false);
    }, [setTasks, toast, currentUser]);

    const handleDeleteTask = useCallback((taskId: string) => {
        setTasks(prev => prev.filter(t => t.id !== taskId));
        toast.info('Task deleted.');
        setViewingTask(null);
    }, [setTasks, toast]);

    const handleDprSubmitForReview = useCallback(async (projectId: string, dpr: DailyProgress, consumedMaterials: MaterialLog[]) => {
        setIsAIGenerating(true);
        try {
            const project = projects.find(p => p.id === projectId);
            if (!project) throw new Error("Project not found");

            const briefing = await generateDailyNote(dpr, project);
            dpr.aiBriefing = briefing;
            dpr.isAiBriefingApproved = false; // Set default state
            setDprForReview({ projectId, dpr, consumedMaterials });
        } catch (e) {
            console.error("Failed to generate AI briefing on submit:", e);
            toast.error("Failed to generate AI briefing. Please try again.");
        } finally {
            setIsAIGenerating(false);
        }
    }, [projects, toast]);

    const handleConfirmDprReview = useCallback(() => {
        if (!dprForReview) return;
        const { projectId, dpr, consumedMaterials } = dprForReview;

        const approvedDpr = { ...dpr, isAiBriefingApproved: true };

        setProjects(prevProjects => {
            const newProjects = [...prevProjects];
            const projectIndex = newProjects.findIndex(p => p.id === projectId);
            if (projectIndex === -1) return prevProjects;

            const projectToUpdate = JSON.parse(JSON.stringify(newProjects[projectIndex]));

            if (approvedDpr.stageUpdates) {
                Object.entries(approvedDpr.stageUpdates).forEach(([stageId, updates]) => {
                    const stage = projectToUpdate.wbs.find((s: WBSStage) => s.id === stageId);
                    if (stage) {
                        const typedUpdates = updates as { startDate?: string; completionDate?: string };
                        if (typedUpdates.startDate) stage.actualStartDate = typedUpdates.startDate;
                        if (typedUpdates.completionDate) stage.actualCompletionDate = typedUpdates.completionDate;
                    }
                });
            }

            let workDoneCost = 0;
            const allBoqItemsMap = new Map<string, BOQItem>(
                [...(projectToUpdate.boq || []), ...(projectToUpdate.extraBoq || [])]
                    .flatMap((h: { subHeads: any[] }) => h.subHeads.flatMap((sh: any) => sh.items))
                    .map((item: any) => [item.id, item])
            );

            if (approvedDpr.workProgress && projectToUpdate.wbs) {
                approvedDpr.workProgress.forEach(progressItem => {
                    if (progressItem.completedQty > 0) {
                        const stage = projectToUpdate.wbs.find((s: WBSStage) => s.id === progressItem.wbsStageId);
                        if (stage) {
                            if (!stage.actualStartDate) stage.actualStartDate = approvedDpr.date;
                            const allocation = stage.stageAllocations.find((a: any) => a.boqItemId === progressItem.boqItemId);
                            if (allocation) {
                                allocation.cumulativeCompletedQty = (allocation.cumulativeCompletedQty || 0) + progressItem.completedQty;
                                const boqItem = allBoqItemsMap.get(progressItem.boqItemId);
                                if (boqItem) workDoneCost += progressItem.completedQty * boqItem.workingRate;
                            }
                        }
                    }
                });

                projectToUpdate.wbs.forEach((stage: WBSStage) => {
                    if (stage.stageAllocations.length > 0 && !stage.actualCompletionDate) {
                        const isComplete = stage.stageAllocations.every((alloc: any) => (alloc.cumulativeCompletedQty || 0) >= alloc.quantity * 0.999);
                        if (isComplete) stage.actualCompletionDate = approvedDpr.date;
                    }
                });
            }

            const existingIndex = projectToUpdate.dailyProgress.findIndex((dp: DailyProgress) => dp.date === approvedDpr.date);
            if (existingIndex > -1) projectToUpdate.dailyProgress[existingIndex] = approvedDpr;
            else {
                projectToUpdate.dailyProgress.push(approvedDpr);
                projectToUpdate.dailyProgress.sort((a: DailyProgress, b: DailyProgress) => new Date(a.date).getTime() - new Date(b.date).getTime());
            }

            const totalBudget = projectToUpdate.wbs.reduce((sum: number, s: WBSStage) => sum + (s.allocatedBudget || 0), 0);
            let newProgressPercentage = 0;
            if (totalBudget > 0) {
                const completedBudget = projectToUpdate.wbs.reduce((sum: number, stage: WBSStage) => {
                    const stageBudget = stage.allocatedBudget || 0;
                    let stageCompletion = 0;
                    if (stage.actualCompletionDate) stageCompletion = 1;
                    else if (stage.stageAllocations.length > 0) {
                        const totalAllocatedValue = stage.stageAllocations.reduce((s: number, a: any) => s + (a.quantity * (allBoqItemsMap.get(a.boqItemId)?.workingRate || 0)), 0);
                        if (totalAllocatedValue > 0) {
                            const completedValue = stage.stageAllocations.reduce((s: number, a: any) => s + ((a.cumulativeCompletedQty || 0) * (allBoqItemsMap.get(a.boqItemId)?.workingRate || 0)), 0);
                            stageCompletion = completedValue / totalAllocatedValue;
                        }
                    }
                    return sum + (stageBudget * stageCompletion);
                }, 0);
                newProgressPercentage = (completedBudget / totalBudget) * 100;
            } else {
                const lastProgress = projectToUpdate.dailyProgress[projectToUpdate.dailyProgress.length - 2]?.progressPercentage || 0;
                newProgressPercentage = Math.min(100, lastProgress + 0.5);
            }
            projectToUpdate.dailyProgress[projectToUpdate.dailyProgress.length - 1].progressPercentage = newProgressPercentage;

            projectToUpdate.spent = (projectToUpdate.spent || 0) + workDoneCost;
            newProjects[projectIndex] = projectToUpdate;
            return newProjects;
        });

        inventoryActions.consumeFromInventory(projectId, consumedMaterials);
        logActivity(currentUser!.id, 'DPR_SUBMITTED', { entityType: 'Project', entityName: projects.find(p => p.id === projectId)?.name });
        toast.success('DPR approved and submitted successfully.');
        setDprForReview(null);
    }, [dprForReview, projects, setProjects, inventoryActions, logActivity, currentUser, toast]);

    const handleRegenerateDprReview = useCallback(async () => {
        if (!dprForReview) return;
        setIsAIGenerating(true);
        try {
            const { projectId, dpr } = dprForReview;
            const project = projects.find(p => p.id === projectId);
            if (!project) throw new Error("Project not found");
            const briefing = await generateDailyNote(dpr, project);
            setDprForReview(prev => {
                if (!prev) return null;
                return { ...prev, dpr: { ...prev.dpr, aiBriefing: briefing } };
            });
            toast.success("AI briefing has been regenerated.");
        } catch (e) {
            toast.error("Failed to regenerate briefing.");
        } finally {
            setIsAIGenerating(false);
        }
    }, [dprForReview, projects, toast]);

    const handleUpdateDprAiBriefing = useCallback(async (projectId: string, date: string) => {
        setIsAIGenerating(true);
        try {
            const project = projects.find(p => p.id === projectId);
            const dpr = project?.dailyProgress.find(d => d.date === date);

            if (dpr && project) {
                const briefing = await generateDailyNote(dpr, project);
                setProjects(prev => prev.map(p => {
                    if (p.id === projectId) {
                        const newDprs = p.dailyProgress.map(d => {
                            if (d.date === date) {
                                return { ...d, aiBriefing: briefing };
                            }
                            return d;
                        });
                        return { ...p, dailyProgress: newDprs };
                    }
                    return p;
                }));
                toast.success("AI briefing generated and saved.");
            } else {
                throw new Error("Project or DPR not found");
            }

        } catch (e) {
            toast.error("Failed to generate AI briefing.");
            console.error("Error generating AI briefing:", e);
        } finally {
            setIsAIGenerating(false);
        }
    }, [projects, setProjects, toast]);

    const handleApproveBriefingFromDetail = useCallback((projectId: string, date: string) => {
        setProjects(prev => prev.map(p => {
            if (p.id === projectId) {
                const newDprs = p.dailyProgress.map(dpr => dpr.date === date ? { ...dpr, isAiBriefingApproved: true } : dpr);
                return { ...p, dailyProgress: newDprs };
            }
            return p;
        }));
        toast.success(`AI briefing for ${date} has been approved for client view.`);
    }, [setProjects, toast]);


    const handleDprClientUpdate = useCallback((projectId: string, date: string, clientRemarks: NonNullable<DailyProgress['clientRemarks']>) => {
        setProjects(prev => prev.map(p => {
            if (p.id === projectId) {
                const newDprs = p.dailyProgress.map(dpr => {
                    if (dpr.date === date) {
                        return { ...dpr, clientRemarks };
                    }
                    return dpr;
                });
                return { ...p, dailyProgress: newDprs };
            }
            return p;
        }));
        logActivity(currentUser!.id, 'COMMENT_ADDED', { entityType: 'Project', entityName: projects.find(p => p.id === projectId)?.name, changeDescription: `Client feedback on DPR for ${date}` });
        toast.success('Feedback submitted successfully.');
    }, [setProjects, toast, currentUser, projects, logActivity]);

    const handleOpenCreateRequisition = useCallback((initialData: any) => {
        setCreateRequisitionInitialData(initialData);
        setIsCreateRequisitionModalOpen(true);
    }, []);

    const handleCreateRequisition = useCallback((data: { projectId: string; requiredByDate: string; items: Omit<RequisitionItem, "id">[]; attachments?: Attachment[]; requesterRemarks?: string; reminderDate?: string; }) => {
        procurementActions.addRequisition(data, currentUser!.id);
        toast.success(`Requisition created.`);
        setIsCreateRequisitionModalOpen(false);
    }, [procurementActions, currentUser, toast]);

    const handleUpdateRequisitionStatus = useCallback((reqId: string, status: any, options?: any) => {
        procurementActions.updateRequisitionStatus(reqId, status, options);
        if (!options?.remarks) {
            toast.info(`Requisition status updated.`);
        }
    }, [procurementActions, toast]);

    const handleCreatePO = useCallback((poData: Omit<PurchaseOrder, 'id' | 'poNumber'>, creatorId: string) => {
        const newPO = procurementActions.addPO(poData, creatorId);
        toast.success(`Purchase Order ${newPO.poNumber} created in Draft status for review.`);
        setCreatingPOForReq(null);
        setIsStandalonePOCreation(false);
        setCreatePOFromCSData(null); // Clear CS data if any
        setAddAssetModalOpen(false);
        setViewingPO(newPO);
    }, [procurementActions, toast]);

    const handleUpdatePOStatus = useCallback((poId: string, status: PurchaseOrder['status']) => {
        procurementActions.updatePO(poId, { status });
        setViewingPO(prevPO => (prevPO && prevPO.id === poId ? { ...prevPO, status } : prevPO));
        toast.success(`Purchase Order status updated to "${status}".`);
    }, [procurementActions, toast]);

    const handleVendorCreate = useCallback((vendorData: Omit<Vendor, 'id' | 'performanceRating'>) => {
        const apSubAccounts = chartOfAccounts.filter(acc => acc.parentId === ACCOUNT_CODES.ACCOUNTS_PAYABLE);
        const lastSubAccountNum = apSubAccounts.reduce((max, acc) => {
            if (!acc || typeof acc.id !== 'string' || !acc.id.includes('.')) return max;
            const num = parseInt(acc.id.split('.')[1], 10);
            return !isNaN(num) && num > max ? num : max;
        }, 0);
        const newAccountId = `${ACCOUNT_CODES.ACCOUNTS_PAYABLE}.${(lastSubAccountNum + 1).toString().padStart(2, '0')}`;

        addAccount({
            id: newAccountId,
            name: vendorData.name,
            type: 'Liabilities',
            subType: 'Current',
            parentId: ACCOUNT_CODES.ACCOUNTS_PAYABLE
        });

        vendorActions.addVendor({ ...vendorData, accountId: newAccountId });
        setVendorModalMode('view');
        toast.success('Vendor and their accounting ledger created successfully.');
    }, [vendorActions, toast, addAccount, chartOfAccounts]);

    const handleVendorUpdate = useCallback((vendorId: string, updates: Partial<Omit<Vendor, 'id'>>) => {
        vendorActions.updateVendor(vendorId, updates);
        setViewingVendor(prev => prev ? { ...prev, ...updates } : null);
        setVendorModalMode('view');
        toast.success('Vendor updated.');
    }, [vendorActions, toast]);

    const handleVendorDelete = useCallback((vendor: Vendor) => {
        if (vendor.accountId) {
            try {
                deleteAccount(vendor.accountId);
            } catch (e: any) {
                toast.error(e.message);
                return;
            }
        }
        vendorActions.deleteVendor(vendor.id);
        setViewingVendor(null);
        toast.info('Vendor and their accounting ledger have been deleted.');
    }, [vendorActions, deleteAccount, toast]);

    const handlePromoteVendor = useCallback((provId: string, data: any) => {
        // This wraps the logic to create account AND promote
        // 1. Create Account (Logic reused from handleVendorCreate)
        const apSubAccounts = chartOfAccounts.filter(acc => acc.parentId === ACCOUNT_CODES.ACCOUNTS_PAYABLE);
        const lastSubAccountNum = apSubAccounts.reduce((max, acc) => {
            if (!acc || typeof acc.id !== 'string' || !acc.id.includes('.')) return max;
            const num = parseInt(acc.id.split('.')[1], 10);
            return !isNaN(num) && num > max ? num : max;
        }, 0);
        const newAccountId = `${ACCOUNT_CODES.ACCOUNTS_PAYABLE}.${(lastSubAccountNum + 1).toString().padStart(2, '0')}`;

        addAccount({
            id: newAccountId,
            name: data.name,
            type: 'Liabilities',
            subType: 'Current',
            parentId: ACCOUNT_CODES.ACCOUNTS_PAYABLE
        });

        // 2. Perform the swap in vendor data
        // Use `addVendor` directly here
        vendorActions.addVendor({ ...data, accountId: newAccountId });
        vendorActions.promoteProvisionalVendor(provId);

        toast.success('Vendor registration finalized and ledger created.');
    }, [chartOfAccounts, addAccount, vendorActions, toast]);

    const handleSubcontractorCreate = useCallback((subcontractorData: Omit<Subcontractor, 'id' | 'performanceRating'>) => {
        const subPayableAccounts = chartOfAccounts.filter(acc => acc.parentId === ACCOUNT_CODES.SUBCONTRACTOR_PAYABLES);
        const lastSubAccountNum = subPayableAccounts.reduce((max, acc) => {
            if (!acc || typeof acc.id !== 'string' || !acc.id.includes('.')) return max;
            const num = parseInt(acc.id.split('.')[1], 10);
            return !isNaN(num) && num > max ? num : max;
        }, 0);
        const newAccountId = `${ACCOUNT_CODES.SUBCONTRACTOR_PAYABLES}.${(lastSubAccountNum + 1).toString().padStart(2, '0')}`;

        addAccount({
            id: newAccountId,
            name: subcontractorData.name,
            type: 'Liabilities',
            subType: 'Current',
            parentId: ACCOUNT_CODES.SUBCONTRACTOR_PAYABLES
        });

        subcontractorActions.addSubcontractor({ ...subcontractorData, accountId: newAccountId });
        setSubcontractorModalMode('view');
        toast.success('Subcontractor and their accounting ledger created successfully.');
    }, [subcontractorActions, toast, addAccount, chartOfAccounts]);

    const handleSubcontractorUpdate = useCallback((subcontractorId: string, updates: Partial<Omit<Subcontractor, 'id'>>) => {
        subcontractorActions.updateSubcontractor(subcontractorId, updates);
        setViewingSubcontractor(prev => prev ? { ...prev, ...updates } : null);
        setSubcontractorModalMode('view');
        toast.success('Subcontractor updated.');
    }, [subcontractorActions, toast]);

    const handleSubcontractorDelete = useCallback((subcontractor: Subcontractor) => {
        if (subcontractor.accountId) {
            try {
                deleteAccount(subcontractor.accountId);
            } catch (e: any) {
                toast.error(e.message);
                return;
            }
        }
        subcontractorActions.deleteSubcontractor(subcontractor.id);
        setViewingSubcontractor(null);
        toast.info('Subcontractor and their accounting ledger have been deleted.');
    }, [subcontractorActions, deleteAccount, toast]);


    const handleCreateGRN = useCallback(async (data: Omit<GRN, 'id' | 'grnNumber'>) => {
        const newGRN = inventoryActions.addGRN(data);
        setCreatingGRNForPO(null);

        const relatedPO = purchaseOrders.find(po => po.id === newGRN.poId);
        if (!relatedPO) {
            toast.success('GRN created and stock updated.');
            return;
        }

        let toastMessage = 'GRN created and stock updated.';

        if (relatedPO.poType === 'Asset' && relatedPO.assetDetails) {
            await addAsset({
                assetCode: relatedPO.assetDetails.assetCode,
                name: relatedPO.assetDetails.description,
                purchaseDate: newGRN.receiptDate,
                purchaseCost: relatedPO.subTotal,
                usefulLife: relatedPO.assetDetails.usefulLife,
                salvageValue: relatedPO.assetDetails.salvageValue,
                depreciationMethod: 'Straight-Line',
                taxBlock: relatedPO.assetDetails.taxBlock as any,

            }, { postJournalEntry: false });
            toastMessage = 'GRN created. Asset added to register, pending capitalization upon bill entry.';
        }

        const allGrnsForPO = [...grns, newGRN].filter(grn => grn.poId === relatedPO.id);

        const totalReceivedQtys = new Map<string, number>();
        allGrnsForPO.forEach(grn => {
            grn.items.forEach(grnItem => {
                totalReceivedQtys.set(grnItem.materialName, (totalReceivedQtys.get(grnItem.materialName) || 0) + grnItem.acceptedQty);
            });
        });

        const allItemsFullyReceived = relatedPO.items.every(poItem => {
            const receivedQty = totalReceivedQtys.get(poItem.materialName) || 0;
            return receivedQty >= poItem.quantity;
        });

        const newStatus: PurchaseOrder['status'] = allItemsFullyReceived ? 'Received' : 'Partially Received';

        procurementActions.updatePO(relatedPO.id, { status: newStatus });
        toast.success(toastMessage);
    }, [inventoryActions, toast, purchaseOrders, grns, procurementActions, addAsset]);

    const handleCreateManualGRN = useCallback((data: Omit<GRN, 'id' | 'grnNumber' | 'grnType' | 'poId'>) => {
        inventoryActions.addManualGRN(data);
        toast.success('Manual GRN created and stock updated.');
        setIsCreateManualGRNModalOpen(false);
    }, [inventoryActions, toast]);

    const handleCreateVendorInvoice = useCallback(async (data: Omit<VendorInvoice, 'id' | 'status' | 'creatorId' | 'approverId' | 'createdAt' | 'approvedAt'>) => {
        const relatedGrns = data.grnIds.map(id => grns.find(g => g.id === id)).filter((g): g is GRN => !!g);
        const relatedPOs = [...new Set(relatedGrns.map(g => g.poId))]
            .map(poId => purchaseOrders.find(po => po.id === poId))
            .filter((po): po is PurchaseOrder => !!po);

        const assetPO = relatedPOs.find(po => po.poType === 'Asset');
        let newInvoice;

        if (assetPO && assetPO.assetDetails) {
            const asset = fixedAssets.find(fa => fa.assetCode === assetPO.assetDetails?.assetCode);
            if (!asset) {
                toast.error(`Could not find asset with code ${assetPO.assetDetails.assetCode} in the register.`);
                return;
            }

            newInvoice = await accountsActions.addVendorInvoice(data, currentUser!.id, { debitAccountId: asset.assetAccountId });
            toast.success(`Asset bill ${newInvoice.invoiceNumber} created. Asset capitalized and JV posted.`);
        } else {
            newInvoice = await accountsActions.addVendorInvoice(data, currentUser!.id);
            toast.success(`Vendor Bill ${newInvoice.invoiceNumber} created and JV posted.`);
        }

        setVendorInvoiceModalState(null);
    }, [accountsActions, toast, currentUser, grns, purchaseOrders, fixedAssets]);

    const handleOpenCreateInvoiceForGrn = useCallback((grn: GRN) => setVendorInvoiceModalState({ initialGrn: grn }), []);
    const handleOpenStandaloneInvoice = useCallback(() => setVendorInvoiceModalState('standalone'), []);
    const handleOpenCreateInvoiceForGstr2b = useCallback((record: Gstr2bRecord) => {
        setVendorInvoiceModalState({ initialGstr2b: record });
    }, []);

    const handleRecordVendorPayment = useCallback(async (invoiceId: string, paymentDetails: { paymentDate: string; transactionReference: string; }) => {
        await accountsActions.recordVendorPayment(invoiceId, paymentDetails);
        toast.success(`Payment recorded for bill and JV posted.`);
        setRecordingPaymentForInvoice(null);
        setViewingVendorInvoice(prev => prev ? { ...prev, invoice: { ...prev.invoice, status: 'Paid', paymentDate: paymentDetails.paymentDate, paymentTransactionId: paymentDetails.transactionReference, amountPaid: prev.invoice.totalAmount - (prev.invoice.tdsAmount || 0) } } : null);
    }, [accountsActions, toast]);

    const handleAddTransactionCallback = useCallback(async (data: Omit<Transaction, 'id'>) => {
        await addTransaction(data);
        toast.success('Transaction recorded.');
        setIsAddTransactionOpen(false);
    }, [addTransaction, toast]);

    const handleOpenAddPayableTransaction = useCallback(() => {
        setAddTransactionDefaultType('Credit');
        setIsAddTransactionOpen(true);
    }, []);

    const handleOpenAddReceivableTransaction = useCallback(() => {
        setAddTransactionDefaultType('Debit');
        setIsAddTransactionOpen(true);
    }, []);

    const handleCreateClientInvoiceForStage = useCallback((data: { project: Project; stage: WBSStage; }) => {
        setPreselectedInvoiceData(data);
        setIsCreateClientInvoiceOpen(true);
    }, []);

    const handleOpenCreateClientInvoice = useCallback(() => {
        setPreselectedInvoiceData(null);
        setIsCreateClientInvoiceOpen(true);
    }, []);

    const handleCreateClientInvoice = useCallback(async (data: Omit<ClientInvoice, 'id' | 'status'>) => {
        await accountsActions.addClientInvoice(data);
        toast.success(`Client Billing Summary created and JV posted.`);
        setIsCreateClientInvoiceOpen(false);
    }, [accountsActions, toast]);

    const handleRecordClientPayment = useCallback(async (invoiceId: string, paymentDetails: { paymentDate: string; transactionReference: string; amount: number; }) => {
        await accountsActions.recordClientPayment(invoiceId, paymentDetails);
        toast.success(`Client payment of ${formatCurrencyINR(paymentDetails.amount)} recorded and JV posted.`);
        setRecordingClientPayment(null);
        setViewingClientInvoice(prev => {
            if (!prev || prev.id !== invoiceId) return prev;
            const newHistory = [...(prev.paymentHistory || []), { date: paymentDetails.paymentDate, amount: paymentDetails.amount, reference: paymentDetails.transactionReference }];
            const totalPaid = newHistory.reduce((sum, p) => sum + p.amount, 0);
            return { ...prev, paymentHistory: newHistory, status: totalPaid >= prev.totalAmount ? 'Paid' : prev.status };
        });
    }, [accountsActions, toast]);

    const handleKpiSuggestionAdd = useCallback((selectedKras: any) => {
        if (kpiSuggestionUser) {
            const newKras = selectedKras.map((k: any) => ({ id: `kra-${Date.now()}-${Math.random()}`, ...k }));
            userActions.onUserUpdate(kpiSuggestionUser.id, {
                kras: [...(kpiSuggestionUser.kras || []), ...newKras]
            });
            toast.success(`Added ${newKras.length} KRAs to ${kpiSuggestionUser.name}.`);
            setIsKpiSuggestionModalOpen(false);
        }
    }, [kpiSuggestionUser, userActions, toast]);

    const handleGenerateKpiSuggestions = useCallback(async (user: User) => {
        setKpiSuggestionUser(user);
        setKpiSuggestions(null);
        setIsKpiSuggestionModalOpen(true);
        const userRole = roles.find(r => r.id === user.roleId);
        if (userRole) {
            try {
                const suggestions = await generateKpiSuggestions(user, userRole);
                setKpiSuggestions(suggestions);
            } catch (e) {
                toast.error("Failed to generate KPI suggestions.");
                setIsKpiSuggestionModalOpen(false);
            }
        }
    }, [roles, toast]);

    const handleCreateVoucher = useCallback(async (entry: Omit<JournalEntry, 'id' | 'voucherNumber'>) => {
        const newEntry = await addJournalEntry(entry);
        setCreateVoucherState({ isOpen: false });
        return newEntry;
    }, [addJournalEntry]);

    const handleOpenCreateVoucher = useCallback((initialType?: JournalEntry['voucherType']) => {
        setCreateVoucherState({ isOpen: true, initialType });
    }, []);

    const handleCreateSubcontractWorkOrder = useCallback((woData: Omit<SubcontractWorkOrder, 'id' | 'workOrderNumber'>, creatorId: string) => {
        subcontractorActions.addWorkOrder(woData, creatorId);
        toast.success('Subcontract Work Order created.');
        setScWorkOrderModal(null);
    }, [subcontractorActions, toast]);

    const handleCreateSubcontractBill = useCallback(async (billData: Omit<SubcontractBill, 'id' | 'status' | 'approverId' | 'approverRemarks' | 'creatorId' | 'createdAt' | 'approvedAt'>) => {
        await subcontractorActions.addBill(billData, currentUser!.id);
        toast.success('Subcontractor Bill created and JV posted.');
        setScBillModal(null);
    }, [subcontractorActions, currentUser, toast]);

    const handleUpdateSubcontractBillStatus = useCallback((billId: string, status: 'Approved' | 'Rejected', approverId: string, remarks?: string) => {
        subcontractorActions.updateBillStatus(billId, status, approverId, remarks);
        toast.success(`Bill status updated to ${status}.`);
    }, [subcontractorActions, toast]);

    const handleRecordSubcontractorPayment = useCallback(async (billId: string, paymentDetails: { paymentDate: string; transactionReference: string; }) => {
        await subcontractorActions.recordBillPayment(billId, paymentDetails);
        toast.success('Subcontractor payment recorded and JV posted.');
        setRecordingScPayment(null);
        setScBillModal(prev => prev ? { ...prev, data: { ...prev.data!, status: 'Paid', paymentDate: paymentDetails.paymentDate, paymentTransactionId: paymentDetails.transactionReference, amountPaid: prev.data!.totalAmount - (prev.data!.tdsAmount || 0) } } : null);
    }, [subcontractorActions, toast]);

    const handleCreatePaymentRequisition = (data: any) => {
        createRequisition(data);
        toast.success("Payment Requisition Created");
    };

    const handleProcessRequisitionPayment = async (req: PaymentRequisition, executionDetails: PaymentExecutionItem[]) => {
        updateRequisitionStatus(req.id, 'Processed');

        for (const item of executionDetails) {
            if (item.amount > 0) {
                // We need to find if it's a vendor or subcon bill to call correct payment function
                // The req item has billType
                const reqItem = req.items.find(i => i.billId === item.billId);
                if (reqItem) {
                    const paymentDetails = {
                        paymentDate: format(new Date(), 'yyyy-MM-dd'),
                        transactionReference: item.transactionReference,
                        amount: item.amount
                    };

                    if (reqItem.billType === 'Vendor') {
                        await accountsActions.recordVendorPayment(item.billId, paymentDetails);
                    } else {
                        await subcontractorActions.recordBillPayment(item.billId, paymentDetails);
                    }
                }
            }
        }
        toast.success("Payments processed successfully and vouchers created.");
    };

    const handleAddCapitalContribution = useCallback(async (details: { shareholderName: string; amount: number; date: string; bankAccountId: string; numberOfShares: number; }) => {
        // 1. Add to company shareholders (if new) or update existing
        const existingShareholder = companyDetails.shareholders.find(s => s.name === details.shareholderName);
        let shareholderId = existingShareholder?.id;
        let shareholderAccountId = existingShareholder?.accountId;

        if (!existingShareholder) {
            // Create new shareholder ledger
            shareholderId = `sh-${Date.now()}`;
            // Create Capital Account for shareholder
            const capitalAccounts = chartOfAccounts.filter(acc => acc.parentId === ACCOUNT_CODES.OWNERS_CAPITAL);
            const lastNum = capitalAccounts.reduce((max, acc) => {
                const parts = acc.id.split('.');
                if (parts.length < 2) return max;
                const num = parseInt(parts[1], 10);
                return !isNaN(num) && num > max ? num : max;
            }, 0);
            shareholderAccountId = `${ACCOUNT_CODES.OWNERS_CAPITAL}.${(lastNum + 1).toString().padStart(2, '0')}`;

            addAccount({
                id: shareholderAccountId,
                name: details.shareholderName,
                type: 'Equity',
                parentId: ACCOUNT_CODES.OWNERS_CAPITAL
            });
        }

        const newShareholder: Shareholder = {
            id: shareholderId!,
            name: details.shareholderName,
            accountId: shareholderAccountId!,
            numberOfShares: (existingShareholder?.numberOfShares || 0) + details.numberOfShares
        };

        const newShareholders = existingShareholder
            ? companyDetails.shareholders.map(s => s.id === newShareholder.id ? newShareholder : s)
            : [...companyDetails.shareholders, newShareholder];

        updateCompanyDetails({ ...companyDetails, shareholders: newShareholders });

        // 2. Post Journal Entry
        // Debit Bank, Credit Share Capital (Shareholder Account) and Share Premium if applicable
        const shareParValue = companyDetails.shareParValue || 10;
        const shareCapitalAmount = details.numberOfShares * shareParValue;
        const sharePremiumAmount = details.amount - shareCapitalAmount;

        const jeDetails: JournalEntryDetail[] = [
            { accountId: details.bankAccountId, debit: details.amount, credit: 0 },
            { accountId: shareholderAccountId!, debit: 0, credit: shareCapitalAmount }
        ];

        if (sharePremiumAmount > 0) {
            jeDetails.push({ accountId: ACCOUNT_CODES.SHARE_PREMIUM, debit: 0, credit: sharePremiumAmount });
        }

        await addJournalEntry({
            date: details.date,
            description: `Capital contribution from ${details.shareholderName} (${details.numberOfShares} shares)`,
            voucherType: 'RV',
            details: jeDetails
        });

        toast.success("Capital contribution recorded.");
        setIsCapitalContributionModalOpen(false);
    }, [companyDetails, chartOfAccounts, addAccount, updateCompanyDetails, addJournalEntry, toast]);

    // Removed auto-login for production security


    return (
        <Routes>
            <Route path="/" element={<LandingPage onEnterApp={() => navigate('/login')} companyDetails={companyDetails} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} loginError={loginError} companyDetails={companyDetails} />} />
            <Route path="/app/*" element={
                <ProtectedRoute user={currentUser}>
                    <div className={`flex h-screen bg-background text-text-primary font-sans transition-colors duration-200`}>

                        <Sidebar currentView={currentView} setCurrentView={handleSetCurrentView} user={currentUser!} companyLogoUrl={companyDetails.logoUrl} />
                        <div className="flex-1 flex flex-col overflow-hidden">
                            <Header
                                currentView={currentView}
                                user={currentUser!}

                                theme={theme}
                                toggleTheme={toggleTheme}
                                onLogout={handleLogout}
                                onSearchClick={() => setIsSearchOpen(true)}
                                onSetCurrentView={handleSetCurrentView}
                                projects={projects}
                                selectedProjectIds={dashboardSelectedProjectIds}
                                onSelectedProjectIdsChange={setDashboardSelectedProjectIds}
                                onSwitchUser={handleSwitchUser}
                                allUsers={users}
                            />
                            <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                                {currentView === 'dashboard' && <Dashboard
                                    currentUser={currentUser!}

                                    roles={roles}
                                    projectData={projectData}
                                    tasks={tasks}
                                    requisitions={requisitions}
                                    purchaseOrders={purchaseOrders}
                                    vendorInvoices={vendorInvoices}
                                    clientInvoices={clientInvoices}
                                    subcontractorBills={bills}
                                    financialSummary={financialSummary}
                                    onSetCurrentView={handleSetCurrentView}
                                    selectedProjectIds={dashboardSelectedProjectIds}
                                    onSelectedProjectIdsChange={setDashboardSelectedProjectIds}
                                    onViewTask={(t) => { setViewingTask(t); }}
                                    onViewRequisition={(r) => { setViewingRequisition(r); }}
                                    onViewPO={(po) => { setViewingPO(po); }}
                                    onViewVendorInvoice={(inv) => { setViewingVendorInvoice({ invoice: inv }); }}
                                    onViewSubcontractorBill={(b) => { setScBillModal({ mode: 'view', data: b }); }}
                                    isAIGenerating={isAIGenerating}
                                    setIsAIGenerating={setIsAIGenerating}
                                    users={users}
                                    leaveRequests={hrData.leaveRequests}
                                    attendance={hrData.attendance}
                                    payrollRuns={payrollData.payrollRuns}
                                    paymentRequisitions={paymentRequisitions}
                                    onUpdateRequisitionStatus={updateRequisitionStatus}
                                    onProcessRequisitionPayment={handleProcessRequisitionPayment}
                                    bankAccounts={bankAccounts}
                                    inventory={inventory}
                                    onCreateRequisition={createRequisition}
                                />}
                                {currentView === 'reports' && <Reports projectData={projectData} isAIGenerating={isAIGenerating} setIsAIGenerating={setIsAIGenerating} onSaveWpr={(pid, wpr) => handleUpdateProject(pid, { generatedWprs: [...(projects.find(p => p.id === pid)?.generatedWprs || []), wpr] })} onSaveMpr={(pid, mpr) => handleUpdateProject(pid, { generatedMprs: [...(projects.find(p => p.id === pid)?.generatedMprs || []), mpr] })} onUpdateProject={handleUpdateProject} users={users} onOpenPrmModal={(p) => setPrmModalState({ isOpen: true, project: p })} />}
                                {currentView === 'planning' && <Planning projectData={projectData} onPlanningUpdate={handleUpdateProject} activeTab={planningTab} onTabChange={setPlanningTab} onCreateClientInvoice={handleCreateClientInvoiceForStage} dataBank={dataBank} isAIGenerating={isAIGenerating} setIsAIGenerating={setIsAIGenerating} onOpenCreateRequisition={handleCreateRequisition} tasks={tasks} onViewTask={(t) => setViewingTask(t)} hoveredWbsStageId={hoveredWbsStageId} setHoveredWbsStageId={setHoveredWbsStageId} />}
                                {currentView === 'tendering' && <Tendering projectData={projectData} onPlanningUpdate={handleUpdateProject} onAwardProjectClick={(p) => setAwardingProject(p)} isAIGenerating={isAIGenerating} setIsAIGenerating={setIsAIGenerating} />}
                                {currentView === 'dpr' && <DPR projectData={projectData} inventory={inventory} onDprSubmit={handleDprSubmitForReview} isAIGenerating={isAIGenerating} setIsAIGenerating={setIsAIGenerating} currentUser={currentUser} allUsers={users} roles={roles} onDprClientUpdate={handleDprClientUpdate} onUpdateDprAiBriefing={handleUpdateDprAiBriefing} onApproveBriefing={handleApproveBriefingFromDetail} purchaseOrders={purchaseOrders} />}
                                {currentView === 'supplyChain' && <SupplyChain
                                    projectData={projectData} requisitions={requisitions} inventory={inventory} grns={grns} vendorInvoices={vendorInvoices} projects={projects} purchaseOrders={purchaseOrders} users={users} currentUser={currentUser}
                                    isAIGenerating={isAIGenerating} setIsAIGenerating={setIsAIGenerating} onCreateRequisitionClick={() => setIsCreateRequisitionModalOpen(true)} onViewRequisition={(req) => setViewingRequisition(req)}
                                    onViewPO={(po) => setViewingPO(po)} onCreatePOClick={() => setIsStandalonePOCreation(true)} onCreateGRNClick={(po) => setCreatingGRNForPO(po)} onCreateManualGRNClick={() => setIsCreateManualGRNModalOpen(true)} onViewGRNClick={(grn) => setViewingGRN(grn)} onViewInventoryClick={() => setIsInventoryDetailOpen(true)}
                                    onCreateVendorInvoiceClick={handleOpenCreateInvoiceForGrn} onAddVendorBillClick={handleOpenStandaloneInvoice} onViewVendorInvoice={(inv) => setViewingVendorInvoice({ invoice: inv })}
                                    vendors={vendors} onAddVendorClick={() => setVendorModalMode('create')} onViewVendor={(v) => setViewingVendor(v)} updateRequisitionStatus={handleUpdateRequisitionStatus}
                                />}
                                {currentView === 'materialManagement' && <MaterialManagement projects={projects} inventory={inventory} requisitions={requisitions} purchaseOrders={purchaseOrders} grns={grns} vendors={vendors} onOpenCreateRequisition={handleCreateRequisition} />}
                                {currentView === 'subcontracts' && <SubcontractsView
                                    subcontractors={subcontractors} workOrders={workOrders} bills={bills} projects={projects}
                                    onAddSubcontractorClick={() => setSubcontractorModalMode('create')} onViewSubcontractor={(s) => setViewingSubcontractor(s)}
                                    onAddWorkOrderClick={() => setScWorkOrderModal({ mode: 'create' })} onViewWorkOrder={(wo) => setScWorkOrderModal({ mode: 'view', data: wo })}
                                    onAddBillClick={() => setScBillModal({ mode: 'create' })} onViewBill={(b) => setScBillModal({ mode: 'view', data: b })}
                                />}
                                {currentView === 'collaboration' && <Collaboration currentUser={currentUser} allUsers={users} tasks={tasks} requisitions={requisitions} onTaskClick={(t) => setViewingTask(t)} onRequisitionClick={(r) => setViewingRequisition(r)} />}
                                {currentView === 'projectControl' && <ProjectControlCenter projects={projects} tasks={tasks} onCreateClick={handleOpenNewProjectModal} onEditClick={setEditingProject} onUpdate={handleUpdateProject} onDelete={handleDeleteProject} />}
                                {currentView === 'users' && <Users users={users} roles={roles} onUserUpdate={userActions.onUserUpdate} onUserInvite={handleUserInvite} onUserDelete={userActions.onUserDelete} onRoleCreate={userActions.onRoleCreate} onRoleUpdate={userActions.onRoleUpdate} onRoleDelete={userActions.onRoleDelete} onOpenKpiSuggestions={(u) => handleGenerateKpiSuggestions(u)} currentUser={currentUser} />}
                                {currentView === 'hr' && <HR users={users} employees={hrData.employees || []} departments={hrData.departments} roles={roles} allUsers={users} currentUser={currentUser} projects={projects} tasks={tasks} leaveRequests={hrData.leaveRequests} attendance={hrData.attendance} policies={hrData.policies} addPolicy={hrData.addPolicy} deletePolicy={hrData.deletePolicy} addLeaveRequest={hrData.addLeaveRequest} updateLeaveRequestStatus={hrData.updateLeaveRequestStatus} setAttendanceForUser={hrData.setAttendanceForUser} addEmployee={hrData.addEmployee} updateEmployee={hrData.updateEmployee} addAccount={addAccount} chartOfAccounts={chartOfAccounts} addDepartment={hrData.addDepartment} updateDepartment={hrData.updateDepartment} deleteDepartment={hrData.deleteDepartment} onInitiateExit={userActions.onInitiateExit} />}
                                {currentView === 'ess' && <ESS currentUser={currentUser} allUsers={users} roles={roles} onUserUpdate={userActions.onUserUpdate} leaveRequests={hrData.leaveRequests} attendance={hrData.attendance} addLeaveRequest={hrData.addLeaveRequest} />}
                                {currentView === 'payroll' && <Payroll users={users} employees={hrData.employees || []} currentUser={currentUser} runPayroll={payrollData.runPayroll} payrollRuns={payrollData.payrollRuns || []} payslips={payrollData.payslips || []} attendance={hrData.attendance} roles={roles} companyDetails={companyDetails} updateEmployee={hrData.updateEmployee} />}
                                {currentView === 'activity' && <Activity activityLog={activityLog} users={users} projects={projects} />}
                                {currentView === 'tasks' && <Tasks tasks={tasks} projects={projects} users={users} onUpdateTask={handleUpdateTask} onViewTask={setViewingTask} onCreateTaskClick={() => handleOpenCreateTask()} hoveredWbsStageId={hoveredWbsStageId} setHoveredWbsStageId={setHoveredWbsStageId} />}
                                {currentView === 'calendar' && <Calendar events={calendarEvents} onEventClick={(e) => { if (e.type === 'task') setViewingTask(e.data); else if (e.type === 'requisition') setViewingRequisition(e.data); else if (e.type === 'delivery') setViewingPO(e.data); }} projects={projects} users={users} onUpdateTask={handleUpdateTask} onOpenCreateTask={handleOpenCreateTask} isAIGenerating={isAIGenerating} setIsAIGenerating={setIsAIGenerating} />}
                                {currentView === 'accounts' && <AccountsView setCurrentView={handleSetCurrentView} financialSummary={financialSummary} transactions={transactions} vendorInvoices={vendorInvoices} clientInvoices={clientInvoices} vendors={vendors} projects={projects} subcontractorBills={bills} subcontractors={subcontractors} onViewVendorInvoice={(inv) => setViewingVendorInvoice({ invoice: inv })} onViewClientInvoice={setViewingClientInvoice} onViewPaymentAdvice={setViewingPaymentAdvice} onViewSubcontractorBill={(b) => setScBillModal({ mode: 'view', data: b })} />}
                                {currentView === 'payables' && <Payables vendorInvoices={vendorInvoices} vendors={vendors} subcontractorBills={bills} subcontractors={subcontractors} projects={projects} purchaseOrders={purchaseOrders} onViewVendorInvoice={(inv) => setViewingVendorInvoice({ invoice: inv })} onViewSubcontractorBill={(b) => setScBillModal({ mode: 'view', data: b })} onAddVendorBillClick={handleOpenStandaloneInvoice} generalLedger={generalLedger} onViewLedger={(v) => setViewingVendorLedger(v)} onViewSubcontractorLedger={(s) => setViewingSubcontractorLedger(s)} users={users} onViewEmployeeLedger={setViewingEmployeeLedger} journalEntries={journalEntries} transactions={transactions} chartOfAccounts={chartOfAccounts} onViewAccountLedger={handleViewAccountLedger} onViewVoucherFromLedger={(id) => { setViewingAccountLedger(null); handleViewVoucher(id); }} paymentRequisitions={paymentRequisitions} onCreateRequisition={createRequisition} onUpdateRequisitionStatus={updateRequisitionStatus} currentUser={currentUser} onProcessRequisitionPayment={handleProcessRequisitionPayment} />}
                                {currentView === 'receivables' && <Receivables clientInvoices={clientInvoices} transactions={transactions} projects={projects} financialSummary={financialSummary} onViewClientInvoice={setViewingClientInvoice} onAddTransactionClick={handleOpenAddReceivableTransaction} onCreateInvoiceClick={handleOpenCreateClientInvoice} onRecordPayment={setRecordingClientPayment} onViewLedger={setViewingClientLedger} journalEntries={journalEntries} chartOfAccounts={chartOfAccounts} onViewAccountLedger={handleViewAccountLedger} onViewVoucherFromLedger={(id) => { setViewingAccountLedger(null); handleViewVoucher(id); }} />}
                                {currentView === 'gst' && <GST clientInvoices={clientInvoices} vendorInvoices={vendorInvoices} vendors={vendors} projects={projects} subcontractorBills={bills} subcontractors={subcontractors} gstr2bPortalData={gstr2bPortalData} onGstr2bDataImport={setGstr2bPortalData} onOpenAddGstr2bRecord={() => setIsAddGstr2bModalOpen(true)} onViewVendorInvoice={setViewingVendorInvoice} onViewSubcontractorBill={(b) => setScBillModal({ mode: 'view', data: b })} onOpenCreateInvoiceForGstr2b={handleOpenCreateInvoiceForGstr2b} gstr3bClaimedData={gstr3bClaimedData} onUpdateVendorInvoice={updateVendorInvoice} gstr1FilingData={gstr1FilingData} onUpdateGstr1Filing={updateGstr1Filing} onFinalizeGstr1={finalizeGstr1} onRequestGstr1Revision={requestGstr1Revision} onApproveGstr1Revision={approveGstr1Revision} gstr3bFilingData={gstr3bFilingData} onUpdateGstr3bFiling={updateGstr3bFiling} companyDetails={companyDetails} gstr2bReconData={gstr2bReconData} onFinalizeGstr2bReconciliation={finalizeGstr2bReconciliation} onRequestGstr2bRevision={requestGstr2bRevision} onApproveGstr2bRevision={approveGstr2bRevision} onFinalizeGstr3b={finalizeGstr3b} onRequestGstr3bRevision={requestGstr3bRevision} onApproveGstr3bRevision={approveGstr3bRevision} currentUser={currentUser} users={users} generalLedger={generalLedger} journalEntries={journalEntries} chartOfAccounts={chartOfAccounts} onViewClientInvoice={setViewingClientInvoice} />}
                                {currentView === 'financials' && <Financials onBack={() => setCurrentView('financialReporting')} onAccountClick={handleViewAccountLedger} onViewVoucher={(id) => { setViewingAccountLedger(null); handleViewVoucher(id); }} />}
                                {currentView === 'ledger' && <GeneralLedgerView onOpenCreateVoucher={handleOpenCreateVoucher} onViewVoucher={handleViewVoucher} onOpenOpeningBalanceModal={() => setIsOpeningBalanceModalOpen(true)} />}
                                {currentView === 'chartOfAccounts' && <ChartOfAccountsView onViewVoucher={handleViewVoucher} onViewAccountLedger={handleViewAccountLedger} />}
                                {currentView === 'financialReporting' && <FinancialReportingView setCurrentView={setCurrentView} />}
                                {currentView === 'projectProfitability' && <ProjectProfitabilityView projects={projects} clientInvoices={clientInvoices} />}
                                {currentView === 'equityReporting' && <EquityReportingView companyDetails={companyDetails} onOpenCapitalContributionModal={() => setIsCapitalContributionModalOpen(true)} />}
                                {currentView === 'companySettings' && <CompanySettings companyDetails={companyDetails} onUpdate={updateCompanyDetails} />}
                                {currentView === 'landingPageSettings' && <LandingPageSettings />}
                                {currentView === 'userManual' && <UserManual />}
                                {currentView === 'fixedAssetRegister' && <FixedAssetRegisterView fixedAssets={fixedAssets} onPurchaseAssetClick={() => setAddAssetModalOpen(true)} onViewAssetClick={setViewingAsset} onRunDepreciationClick={() => setRunAnnualDepreciationModalOpen(true)} companyDetails={companyDetails} onUpdateCompanyDetails={updateCompanyDetails} />}
                                {currentView === 'taxDepreciation' && <TaxDepreciationView fixedAssets={fixedAssets} companyDetails={companyDetails} onSellAssetClick={setSellingAsset} />}
                                {currentView === 'cashFlowForecast' && <CashFlowForecastView onBack={() => setCurrentView('financialReporting')} projects={projects} clientInvoices={clientInvoices} vendorInvoices={vendorInvoices} subcontractorBills={bills} payrollRuns={payrollData.payrollRuns || []} users={users} transactions={transactions} />}
                                {currentView === 'budgetVsActuals' && <BudgetVsActualsView onBack={() => setCurrentView('financialReporting')} projects={projects} transactions={transactions} />}
                                {currentView === 'ebitdaReporting' && <EbitdaReportingView onBack={() => setCurrentView('financialReporting')} companyDetails={companyDetails} fixedAssets={fixedAssets} />}
                                {currentView === 'ratioAnalysis' && <RatioAnalysisView onBack={() => setCurrentView('financialReporting')} isAIGenerating={isAIGenerating} setIsAIGenerating={setIsAIGenerating} />}
                                {currentView === 'tdsCompliance' && <TdsCompliance
                                    companyDetails={companyDetails}
                                    onUpdate={updateCompanyDetails}
                                    addAccount={addAccount}
                                    chartOfAccounts={chartOfAccounts}
                                    generalLedger={generalLedger}
                                    vendorInvoices={vendorInvoices}
                                    vendors={vendors}
                                    subcontractorBills={bills}
                                    subcontractors={subcontractors}
                                    challans={challans}
                                    setChallans={setChallans}
                                    quarterlyReturns={quarterlyReturns}
                                    setQuarterlyReturns={setQuarterlyReturns}
                                    monthlySummaries={monthlySummaries}
                                    setMonthlySummaries={setMonthlySummaries}
                                />}
                                {currentView === 'procurement' && <ProcurementModule
                                    projects={projects}
                                    vendors={vendors}
                                    users={users}
                                    currentUser={currentUser}
                                    requisitions={requisitions}
                                    onUpdateRequisitionStatus={updateRequisitionStatus}
                                    purchaseOrders={purchaseOrders}
                                    companyDetails={companyDetails}
                                    provisionalVendors={provisionalVendors}
                                    onAddProvisionalVendor={addProvisionalVendor}
                                    onGeneratePOFromCS={(data) => setCreatePOFromCSData(data)}
                                />}
                                {currentView === 'qualityControl' && <QualityControl />}
                            </main>
                        </div>

                        <ToastContainer />

                        <NewProjectModal isOpen={isNewProjectModalOpen} onClose={() => setIsNewProjectModalOpen(false)} onCreate={handleCreateProject} />
                        {editingProject && <EditProjectModal isOpen={!!editingProject} onClose={() => setEditingProject(null)} project={editingProject} onUpdate={handleUpdateProject} />}
                        {awardingProject && <AwardProjectModal isOpen={!!awardingProject} onClose={() => setAwardingProject(null)} project={awardingProject} onAward={handleAwardProject} />}
                        {viewingTask && <TaskDetailModal isOpen={!!viewingTask} onClose={() => setViewingTask(null)} task={viewingTask} allTasks={tasks} projects={projects} users={users} currentUser={currentUser} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} onViewTask={setViewingTask} />}
                        <CreateTaskModal isOpen={isCreateTaskModalOpen} onClose={() => setIsCreateTaskModalOpen(false)} onCreate={handleCreateTask} projects={projects} users={users} allTasks={tasks} initialData={createTaskInitialData} />
                        <CreateRequisitionModal isOpen={isCreateRequisitionModalOpen} onClose={() => setIsCreateRequisitionModalOpen(false)} projects={projects} onCreate={handleCreateRequisition} initialData={createRequisitionInitialData} />
                        {viewingRequisition && <RequisitionDetailModal isOpen={!!viewingRequisition} onClose={() => setViewingRequisition(null)} requisition={viewingRequisition} projects={projects} users={users} currentUser={currentUser} onUpdateStatus={updateRequisitionStatus} onOpenPOCreation={(req) => setCreatingPOForReq(req)} onUpdateDetails={procurementActions.updateRequisitionDetails} />}
                        {(creatingPOForReq || isStandalonePOCreation || createPOFromCSData) && <CreatePOModal
                            isOpen={!!creatingPOForReq || isStandalonePOCreation || !!createPOFromCSData}
                            onClose={() => { setCreatingPOForReq(null); setIsStandalonePOCreation(false); setCreatePOFromCSData(null); }}
                            requisition={creatingPOForReq}
                            vendors={vendors}
                            users={users}
                            projects={projects}
                            onCreate={handleCreatePO}
                            companyDetails={companyDetails}
                            currentUser={currentUser}
                            provisionalVendors={provisionalVendors}
                            onPromoteVendor={handlePromoteVendor}
                            initialData={createPOFromCSData}
                        />}
                        {viewingPO && <PODetailModal isOpen={!!viewingPO} onClose={() => setViewingPO(null)} purchaseOrder={viewingPO} project={projects.find(p => p.id === viewingPO.projectId)} vendor={vendors.find(v => v.id === viewingPO.vendorId)} grns={grns} vendorInvoices={vendorInvoices} requisitions={requisitions} users={users} onCreateGRNClick={(po) => setCreatingGRNForPO(po)} onViewGRN={setViewingGRN} onViewVendorInvoice={(inv) => setViewingVendorInvoice({ invoice: inv })} onUpdateStatus={handleUpdatePOStatus} companyDetails={companyDetails} />}
                        {viewingVendor && <VendorDetailModal isOpen={!!viewingVendor || vendorModalMode === 'create'} onClose={() => { setViewingVendor(null); setVendorModalMode('view'); }} vendor={viewingVendor} mode={vendorModalMode} onSetMode={setVendorModalMode} onCreate={handleVendorCreate} onUpdate={handleVendorUpdate} onDelete={handleVendorDelete} onViewLedger={setViewingVendorLedger} companyDetails={companyDetails} />}
                        {creatingGRNForPO && <CreateGRNModal isOpen={!!creatingGRNForPO} onClose={() => setCreatingGRNForPO(null)} purchaseOrder={creatingGRNForPO} grns={grns} onCreate={handleCreateGRN} />}
                        <CreateManualGRNModal isOpen={isCreateManualGRNModalOpen} onClose={() => setIsCreateManualGRNModalOpen(false)} projects={projects} users={users} currentUser={currentUser} onCreate={handleCreateManualGRN} />
                        {viewingGRN && <GRNDetailModal isOpen={!!viewingGRN} onClose={() => setViewingGRN(null)} grn={viewingGRN} projects={projects} users={users} vendorInvoices={vendorInvoices} onCreateInvoiceClick={handleOpenCreateInvoiceForGrn} />}
                        <InventoryDetailModal isOpen={isInventoryDetailOpen} onClose={() => setIsInventoryDetailOpen(false)} inventory={inventory} projects={projects} />
                        {vendorInvoiceModalState && <CreateVendorInvoiceModal isOpen={!!vendorInvoiceModalState} onClose={() => setVendorInvoiceModalState(null)} initialState={vendorInvoiceModalState} grns={grns} purchaseOrders={purchaseOrders} projects={projects} vendors={vendors} users={users} vendorInvoices={vendorInvoices} onCreate={handleCreateVendorInvoice} companyDetails={companyDetails} currentUser={currentUser} />}
                        {viewingVendorInvoice && <VendorInvoiceDetailModal isOpen={!!viewingVendorInvoice} onClose={() => setViewingVendorInvoice(null)} invoiceData={viewingVendorInvoice} vendors={vendors} onRecordPayment={(inv) => setRecordingPaymentForInvoice(inv)} onUpdate={updateVendorInvoice} companyDetails={companyDetails} users={users} />}
                        {recordingPaymentForInvoice && <RecordVendorPaymentModal isOpen={!!recordingPaymentForInvoice} onClose={() => setRecordingPaymentForInvoice(null)} invoice={recordingPaymentForInvoice} onConfirm={handleRecordVendorPayment} />}
                        <AddTransactionModal isOpen={isAddTransactionOpen} onClose={() => setIsAddTransactionOpen(false)} onAdd={handleAddTransactionCallback} defaultType={addTransactionDefaultType} />
                        {viewingVendorLedger && <VendorLedgerModal isOpen={!!viewingVendorLedger} onClose={() => setViewingVendorLedger(null)} vendor={viewingVendorLedger} generalLedger={generalLedger} journalEntries={journalEntries} chartOfAccounts={chartOfAccounts} onViewAccountLedger={handleViewAccountLedger} onViewVoucher={handleViewVoucher} />}
                        {viewingPaymentAdvice && <PaymentAdviceModal isOpen={!!viewingPaymentAdvice} onClose={() => setViewingPaymentAdvice(null)} data={{ transaction: viewingPaymentAdvice, invoice: vendorInvoices.find(i => i.paymentTransactionId === viewingPaymentAdvice.transactionReference), vendor: vendors.find(v => v.id === vendorInvoices.find(i => i.paymentTransactionId === viewingPaymentAdvice.transactionReference)?.vendorId), project: projects.find(p => p.id === vendorInvoices.find(i => i.paymentTransactionId === viewingPaymentAdvice.transactionReference)?.projectId), users, companyDetails }} />}
                        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} projects={projects} users={users} tasks={tasks} setCurrentView={handleSetCurrentView} onViewTask={(t) => setViewingTask(t)} onOpenNewProject={() => setIsNewProjectModalOpen(true)} onOpenNewTask={() => handleOpenCreateTask()} onSelectProject={(id) => { setDashboardSelectedProjectIds([id]); setCurrentView('dashboard'); }} currentUser={currentUser} />
                        <AddGstr2bRecordModal isOpen={isAddGstr2bModalOpen} onClose={() => setIsAddGstr2bModalOpen(false)} onAdd={handleAddGstr2bRecord} />
                        {isCreateClientInvoiceOpen && <CreateClientInvoiceModal isOpen={isCreateClientInvoiceOpen} onClose={() => setIsCreateClientInvoiceOpen(false)} projects={projects} clientInvoices={clientInvoices} onCreate={handleCreateClientInvoice} preselectedData={preselectedInvoiceData} companyDetails={companyDetails} currentUser={currentUser} users={users} />}
                        {viewingClientInvoice && <ClientInvoiceDetailModal isOpen={!!viewingClientInvoice} onClose={() => setViewingClientInvoice(null)} invoice={viewingClientInvoice} project={projects.find(p => p.id === viewingClientInvoice.projectId)} companyDetails={companyDetails} onRecordPayment={setRecordingClientPayment} users={users} />}
                        {recordingClientPayment && <RecordClientPaymentModal isOpen={!!recordingClientPayment} onClose={() => setRecordingClientPayment(null)} invoice={recordingClientPayment} onConfirm={handleRecordClientPayment} />}
                        {viewingClientLedger && <ClientLedgerModal isOpen={!!viewingClientLedger} onClose={() => setViewingClientLedger(null)} clientName={viewingClientLedger} generalLedger={generalLedger} chartOfAccounts={chartOfAccounts} journalEntries={journalEntries} onViewVoucher={handleViewVoucher} onViewAccountLedger={handleViewAccountLedger} clientInvoices={clientInvoices} projects={projects} />}
                        {isKpiSuggestionModalOpen && kpiSuggestionUser && <KpiSuggestionModal isOpen={isKpiSuggestionModalOpen} onClose={() => setIsKpiSuggestionModalOpen(false)} user={kpiSuggestionUser} suggestions={kpiSuggestions} onAdd={handleKpiSuggestionAdd} isLoading={!kpiSuggestions && isKpiSuggestionModalOpen} />}
                        {createVoucherState.isOpen && <PaymentVoucherModal isOpen={createVoucherState.isOpen} onClose={() => setCreateVoucherState({ isOpen: false })} initialType={createVoucherState.initialType}
                            onAddEntry={handleCreateVoucher}
                            accounts={chartOfAccounts}
                            generalLedger={generalLedger}
                            currentUser={currentUser}
                            users={users}
                            vendorInvoices={vendorInvoices}
                            subcontractorBills={bills}
                            vendors={vendors}
                            subcontractors={subcontractors}
                            onViewAdvice={(v) => { setCreateVoucherState({ isOpen: false }); handleViewVoucher(v.id); }}
                            companyDetails={companyDetails}
                        />}
                        {viewingGeneralAdvice && <GeneralPaymentAdviceModal isOpen={!!viewingGeneralAdvice} onClose={() => setViewingGeneralAdvice(null)} voucher={viewingGeneralAdvice} users={users} companyDetails={companyDetails} />}
                        {viewingSubcontractor && <SubcontractorDetailModal isOpen={!!viewingSubcontractor || subcontractorModalMode === 'create'} onClose={() => { setViewingSubcontractor(null); setSubcontractorModalMode('view'); }} subcontractor={viewingSubcontractor} mode={subcontractorModalMode} onSetMode={(m) => setSubcontractorModalMode(m)} onCreate={handleSubcontractorCreate} onUpdate={handleSubcontractorUpdate} onDelete={handleSubcontractorDelete} onViewLedger={setViewingSubcontractorLedger} companyDetails={companyDetails} />}
                        {viewingSubcontractorLedger && <SubcontractorLedgerModal isOpen={!!viewingSubcontractorLedger} onClose={() => setViewingSubcontractorLedger(null)} subcontractor={viewingSubcontractorLedger} generalLedger={generalLedger} journalEntries={journalEntries} chartOfAccounts={chartOfAccounts} onViewAccountLedger={handleViewAccountLedger} onViewVoucher={handleViewVoucher} />}
                        {scWorkOrderModal && <SubcontractorWorkOrderModal isOpen={!!scWorkOrderModal} onClose={() => setScWorkOrderModal(null)} mode={scWorkOrderModal.mode} workOrder={scWorkOrderModal.data} projects={projects} subcontractors={subcontractors} bills={bills} onCreate={handleCreateSubcontractWorkOrder} onUpdate={(id, updates) => subcontractorActions.updateWorkOrder(id, updates)} onViewBill={(b) => setScBillModal({ mode: 'view', data: b })} onCreateBill={(wo) => setScBillModal({ mode: 'create', initialWO: wo })} companyDetails={companyDetails} currentUser={currentUser} users={users} />}
                        {scBillModal && <SubcontractorBillModal isOpen={!!scBillModal} onClose={() => setScBillModal(null)} mode={scBillModal.mode} bill={scBillModal.data} initialWO={scBillModal.initialWO} workOrders={workOrders} subcontractors={subcontractors} bills={bills} projects={projects} users={users} currentUser={currentUser} onCreate={handleCreateSubcontractBill} onUpdateStatus={handleUpdateSubcontractBillStatus} onRecordPayment={(b) => setRecordingScPayment(b)} companyDetails={companyDetails} />}
                        {recordingScPayment && <RecordSubcontractorPaymentModal isOpen={!!recordingScPayment} onClose={() => setRecordingScPayment(null)} bill={recordingScPayment} onConfirm={handleRecordSubcontractorPayment} />}
                        {viewingEmployeeLedger && <EmployeeLedgerModal isOpen={!!viewingEmployeeLedger} onClose={() => setViewingEmployeeLedger(null)} employee={viewingEmployeeLedger} generalLedger={generalLedger} journalEntries={journalEntries} chartOfAccounts={chartOfAccounts} onViewVoucher={handleViewVoucher} onViewAccountLedger={handleViewAccountLedger} />}
                        {isCapitalContributionModalOpen && <AddCapitalContributionModal isOpen={isCapitalContributionModalOpen} onClose={() => setIsCapitalContributionModalOpen(false)} shareholders={companyDetails.shareholders} bankAccounts={bankAccounts} companyDetails={companyDetails} onSave={handleAddCapitalContribution} />}
                        {isOpeningBalanceModalOpen && <OpeningBalanceModal isOpen={isOpeningBalanceModalOpen} onClose={() => setIsOpeningBalanceModalOpen(false)} onSave={addJournalEntry} accounts={chartOfAccounts} />}
                        {addAssetModalOpen && <AddAssetModal isOpen={addAssetModalOpen} onClose={() => setAddAssetModalOpen(false)} onCreatePO={handleCreatePO} projects={projects} vendors={vendors} fixedAssets={fixedAssets} currentUser={currentUser} companyDetails={companyDetails} />}
                        {viewingAsset && <AssetDetailModal isOpen={!!viewingAsset} onClose={() => setViewingAsset(null)} asset={viewingAsset} />}
                        {runAnnualDepreciationModalOpen && <RunAnnualDepreciationModal isOpen={runAnnualDepreciationModalOpen} onClose={() => setRunAnnualDepreciationModalOpen(false)} onRun={(year) => runAnnualDepreciation(year, generalLedger)} fixedAssets={fixedAssets} depreciationLog={depreciationLog} />}
                        {sellingAsset && <SellAssetModal isOpen={!!sellingAsset} onClose={() => setSellingAsset(null)} asset={sellingAsset} onConfirm={(id, date, amount) => sellAsset(id, date, amount, generalLedger)} />}
                        {dprForReview && <DprReviewModal isOpen={!!dprForReview} onClose={() => setDprForReview(null)} dprData={dprForReview} onConfirm={handleConfirmDprReview} onRegenerate={handleRegenerateDprReview} isRegenerating={isAIGenerating} />}
                        {viewingAccountLedger && <AccountLedgerModal isOpen={!!viewingAccountLedger} onClose={() => setViewingAccountLedger(null)} accountLedger={viewingAccountLedger} onViewVoucher={handleViewVoucher} journalEntries={journalEntries} chartOfAccounts={chartOfAccounts} onViewAccountLedger={handleViewAccountLedger} />}
                        {viewingGeneralAdvice && <GeneralPaymentAdviceModal isOpen={!!viewingGeneralAdvice} onClose={() => setViewingGeneralAdvice(null)} voucher={viewingGeneralAdvice} users={users} companyDetails={companyDetails} />}
                        {prmModalState.isOpen && prmModalState.project && <RecordPrmModal isOpen={prmModalState.isOpen} onClose={() => setPrmModalState({ isOpen: false })} project={prmModalState.project} users={users} onRecord={(pid, meeting) => handleUpdateProject(pid, { prms: [...(projects.find(p => p.id === pid)?.prms || []), meeting] })} />}
                    </div>
                </ProtectedRoute>

            } />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );

};

export default App;
