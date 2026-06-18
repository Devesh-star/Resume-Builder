export const landingPageStyles = {
  // Main container
  container: "min-h-screen bg-app-bg grid-bg-animated",

  // Header styles
  header: "fixed top-0 w-full z-50 bg-white/85 backdrop-blur-2xl border-b border-stone-200/60 shadow-sm",
  headerContainer: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center",
  logoContainer: "flex items-center gap-3",
  logoIcon: "w-10 h-10 bg-cyber-gradient-pink-cyan rounded-2xl flex items-center justify-center shadow-lg shadow-primary/15",
  logoIconInner: "w-5 h-5 text-white",
  logoText: "text-xl sm:text-2xl font-extrabold text-cyber-gradient-pink-cyan",
  mobileMenuButton: "md:hidden p-2 rounded-xl hover:bg-stone-100 transition-colors",
  mobileMenuIcon: "text-primary",

  // Auth buttons
  desktopAuthButton: "relative group px-6 sm:px-8 py-2 sm:py-3 btn-neon-primary text-white font-bold rounded-2xl overflow-hidden transition-all",
  desktopAuthButtonText: "relative",
  desktopAuthButtonOverlay: "absolute inset-0 bg-cyber-gradient-cyan-pink opacity-0 group-hover:opacity-100 transition-opacity",
  mobileAuthButton: "w-full px-6 py-3 btn-neon-primary text-white font-bold rounded-2xl",

  // Mobile menu
  mobileMenu: "md:hidden bg-white/95 backdrop-blur-2xl w-full fixed top-16 left-0 right-0 z-40 shadow-lg border-b border-stone-200 transition-all duration-300 ease-in-out",
  mobileMenuContainer: "max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4",
  mobileUserInfo: "flex flex-col gap-4 py-2",
  mobileUserWelcome: "text-primary font-medium text-center py-2 text-base sm:text-lg",
  mobileDashboardButton: "w-full px-6 py-3 btn-neon-primary text-white font-bold rounded-xl transition-all",

  // Main content
  main: "pt-24",

  // Hero section
  heroSection: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 min-h-[calc(100vh-6rem)] flex items-center",
  heroGrid: "grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-center w-full",
  heroLeft: "space-y-5 md:col-span-7",
  tagline: "inline-flex items-center gap-2 sm:gap-3 px-4 py-2 bg-primary/8 border border-primary/20 text-primary rounded-full font-bold text-xs sm:text-sm shadow-sm",
  heading: "text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight",
  headingText: "block text-indigo-500",
  headingGradient: "block text-shine-gradient",
  description: "text-base sm:text-lg lg:text-xl text-indigo-400 leading-relaxed max-w-lg font-medium",
  ctaButtons: "flex flex-col sm:flex-row gap-4 items-center sm:items-stretch",

  // Buttons
  primaryButton: "group relative px-10 py-4 btn-neon-primary text-white font-bold rounded-2xl overflow-hidden transition-all",
  primaryButtonOverlay: "absolute inset-0 bg-cyber-gradient-cyan-pink opacity-0 group-hover:opacity-100 transition-opacity",
  primaryButtonContent: "relative flex items-center justify-center gap-2 sm:gap-3",
  primaryButtonIcon: "group-hover:translate-x-1 transition-transform",
  secondaryButton: "px-8 sm:px-10 py-3 sm:py-4 border-2 border-primary/20 text-indigo-500 font-bold rounded-2xl hover:border-primary/40 hover:bg-primary/5 hover:text-indigo-500 transition-all",

  // Stats
  statsContainer: "flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-start gap-8 sm:gap-12 pt-8 border-t border-stone-200 mt-8",
  statItem: "flex flex-col items-center sm:items-start text-center sm:text-left min-w-[100px]",
  statNumber: "text-3xl sm:text-4xl font-extrabold tracking-tight mb-1",
  statLabel: "text-xs sm:text-sm text-indigo-500 font-medium uppercase tracking-wider",

  // Hero illustration
  heroIllustration: "relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto md:col-span-5 md:mt-0",
  heroIllustrationBg: "absolute -inset-8 bg-gradient-to-r from-primary/8 to-secondary/8 rounded-3xl blur-3xl",
  heroIllustrationContainer: "relative",

  // SVG styles
  svgContainer: "w-full h-auto max-w-md mx-auto drop-shadow-xl",
  svgRect: "fill-white stroke-stone-200 stroke-[2]",
  svgCircle: "fill-[url(#bgGradient)]",
  svgRectPrimary: "fill-[#4F46E5]",
  svgRectSecondary: "fill-[#818CF8]",
  svgRectLight: "fill-stone-200",
  svgRectSkill: "fill-primary/10",
  svgAnimatedCircle: "fill-[#4F46E5] opacity-80",
  svgAnimatedRect: "fill-[#818CF8] opacity-80",
  svgAnimatedPolygon: "fill-[#4F46E5] opacity-80",

  // Features section
  featuresSection: "bg-gradient-to-br from-app-elevated/50 via-app-bg to-app-elevated/50 py-16 sm:py-24",
  featuresContainer: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
  featuresHeader: "text-center mb-12 sm:mb-20",
  featuresTitle: "text-3xl sm:text-4xl lg:text-5xl font-extrabold text-indigo-500 mb-4 sm:mb-6",
  featuresTitleGradient: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
  featuresDescription: "text-base sm:text-lg text-indigo-400 max-w-2xl mx-auto font-medium",
  featuresGrid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8",

  // Feature cards
  featureCard: "group relative",
  featureCardHover: "absolute -inset-2 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-3xl from-primary/5 to-secondary/5",
  featureCardContent: "relative bg-app-bg/80 border border-stone-200/80 p-6 sm:p-8 rounded-3xl hover:shadow-card-hover transition-all group-hover:scale-105 group-hover:border-primary/20 backdrop-blur-sm",
  featureIconContainer: "w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br rounded-2xl flex items-center justify-center mb-4 sm:mb-6 text-white shadow-lg",
  featureIcon: "w-8 h-8 sm:w-10 sm:h-10",
  featureTitle: "text-xl sm:text-2xl font-extrabold text-indigo-500 mb-2 sm:mb-4",
  featureDescription: "text-sm sm:text-base text-indigo-400 leading-relaxed font-medium",

  // Feature gradients
  featureCardViolet: "from-white to-app-elevated/30",
  featureCardFuchsia: "from-white to-app-elevated/30",
  featureCardOrange: "from-white to-app-elevated/30",
  featureIconViolet: "from-primary to-primary-dim",
  featureIconFuchsia: "from-secondary to-secondary-dim",
  featureIconOrange: "from-primary to-secondary",

  // CTA section
  ctaSection: "py-16 sm:py-24",
  ctaContainer: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
  ctaCard: "relative",
  ctaCardBg: "absolute -inset-6 sm:-inset-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl blur-3xl",
  ctaCardContent: "relative bg-gradient-to-br from-app-bg/90 to-app-elevated/90 border border-stone-200/80 rounded-3xl p-8 sm:p-16 backdrop-blur-xl shadow-xl",
  ctaTitle: "text-3xl sm:text-4xl lg:text-5xl font-extrabold text-indigo-500 mb-4 sm:mb-6",
  ctaTitleGradient: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
  ctaDescription: "text-base sm:text-lg text-indigo-400 mb-6 sm:mb-10 max-w-2xl mx-auto font-medium",
  ctaButton: "group relative px-8 sm:px-12 py-3 sm:py-5 bg-gradient-to-r from-primary to-secondary text-white font-extrabold text-lg rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/20",
  ctaButtonOverlay: "absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity",
  ctaButtonText: "relative",

  // Footer
  footer: "border-t border-stone-200 bg-app-bg py-6 sm:py-8",
  footerContainer: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
  footerText: "text-sm sm:text-base text-indigo-500 font-medium",
  footerHeart: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
  footerLink: "hover:text-primary underline"
};

export const dashboardStyles = {
  // Container
  container: "container mx-auto px-4 py-6",

  // Header
  headerWrapper: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6",
  headerTitle: "text-2xl font-bold text-white",
  headerSubtitle: "text-indigo-500",

  // Create Button
  createButton: "group relative px-10 py-4 bg-[#4338CA] hover:bg-[#3730A3] text-white font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#4338CA]/20",
  createButtonOverlay: "absolute inset-0 bg-[#3730A3] opacity-0 group-hover:opacity-100 transition-opacity",
  createButtonContent: "relative flex items-center gap-3",

  // Loading
  spinnerWrapper: "flex justify-center items-center py-12",
  spinner: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4338CA]",

  // Empty State
  emptyStateWrapper: "flex flex-col items-center justify-center py-12 text-center",
  emptyIconWrapper: "bg-[#4338CA]/10 p-4 rounded-full mb-4 border border-[#4338CA]/20",
  emptyTitle: "text-xl font-bold text-white mb-2",
  emptyText: "text-indigo-500 max-w-md mb-6",

  // Grid
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",

  // New Resume Card
  newResumeCard: "flex flex-col items-center justify-center bg-slate-200/50 border-2 border-dashed border-white/20 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-[0_10px_30px_rgba(216,56,107,0.15)] hover:border-[#4338CA]/50 h-full backdrop-blur-md",
  newResumeIcon: "w-16 h-16 rounded-full bg-[#4338CA]/20 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(216,56,107,0.3)] border border-[#4338CA]/30",
  newResumeTitle: "text-xl font-bold text-white mb-2 text-center",
  newResumeText: "text-indigo-500 text-center",

  // Modal
  modalHeader: "flex justify-between items-center mb-6",
  modalTitle: "text-2xl font-bold text-white",
  modalCloseButton: "text-indigo-500 hover:text-white font-bold text-xl",

  // Delete Confirmation
  deleteIconWrapper: "w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4 border border-red-500/30",
  deleteTitle: "text-xl font-bold text-white mb-2",
  deleteText: "text-indigo-500"
};

export const resumeItemCardStyles = {
  container: (isEditing) => `mx-auto px-4 py-6 ${isEditing ? 'border-[#4338CA]' : 'border-slate-300'}`,
  headerWrapper: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6",
  headerTitle: "text-2xl font-bold text-white",
  headerSubtitle: "text-indigo-500",
};

export const cardStyles = {
  // ProfileInfoCard styles
  profileCard: "flex items-center gap-3 p-2 sm:p-3 bg-slate-200/50 backdrop-blur-xl border border-slate-300 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03]",
  profileInitialsContainer: "w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#4338CA] to-[#ff4d85] rounded-2xl flex items-center justify-center shadow-md shadow-[#4338CA]/20",
  profileInitialsText: "text-base sm:text-lg font-extrabold text-white",
  profileName: "text-xs sm:text-sm font-bold text-white",
  logoutButton: "text-[#4338CA] text-[10px] sm:text-xs font-bold cursor-pointer hover:text-[#ff4d85] transition-colors",

  // ResumeSummaryCard styles
  resumeCard: "group relative h-[360px] sm:h-[380px] lg:h-[400px] flex flex-col bg-slate-200/50 backdrop-blur-md border border-slate-300 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(216,56,107,0.15)] hover:border-[#4338CA]/30",
  cardBackground: "absolute inset-0 bg-gradient-to-br from-[#4338CA]/10 via-transparent to-[#4338CA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
  previewArea: "p-4 sm:p-6 flex-1 relative overflow-hidden",
  emptyPreview: "w-full h-[180px] sm:h-[200px] lg:h-[220px] flex flex-col items-center justify-center rounded-2xl",
  emptyPreviewIcon: "w-16 h-16 bg-[#4338CA]/10 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-[#4338CA]/20",
  emptyPreviewText: "text-white text-sm font-bold",
  emptyPreviewSubtext: "text-indigo-500 text-xs mt-1",
  infoArea: "bg-slate-200/50 border-t border-slate-300 p-4 sm:p-6",
  title: "text-sm sm:text-base font-bold text-white truncate mb-2 group-hover:text-[#4338CA] transition-colors",
  dateInfo: "flex items-center gap-2 text-xs text-indigo-500",

  // Action buttons
  actionOverlay: "absolute inset-4 sm:inset-6 bg-gradient-to-t from-app-surface/95 via-app-surface/50 to-transparent flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl backdrop-blur-[2px]",
  actionButtonsContainer: "flex gap-3",
  editButton: "group/btn w-12 h-12 flex items-center justify-center bg-[#4338CA] hover:bg-[#3730A3] rounded-2xl shadow-md hover:scale-110 transition-all duration-300",
  deleteButton: "group/btn w-12 h-12 flex items-center justify-center bg-red-500 hover:bg-red-600 rounded-2xl shadow-md hover:scale-110 transition-all duration-300",
  buttonIcon: "text-white group-hover/btn:scale-110 transition-transform",

  // Progress and completion styles
  progressBar: "relative w-full h-2 bg-slate-200/50 rounded-full overflow-hidden",
  progressFill: "h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden",
  progressGlow: "absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse",
  progressIndicator: "absolute top-0 h-full w-4 bg-gradient-to-r from-transparent to-white/30 blur-sm transition-all duration-700",
  completionStatus: "flex justify-between items-center mt-2",
  statusText: "text-xs font-medium text-indigo-500",
  percentageText: "text-xs font-bold text-indigo-400",

  // Completion indicator
  completionIndicator: "absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-2 bg-app-surface/80 backdrop-blur-md border border-slate-300 rounded-full shadow-sm",
  completionDot: "w-3 h-3 rounded-full flex items-center justify-center",
  completionDotInner: "w-1 h-1 bg-white rounded-full",
  completionPercentageText: "text-xs font-bold text-white",

  // Completion color classes
  completionHigh: "from-emerald-500 to-teal-500",
  completionMedium: "from-amber-500 to-orange-500",
  completionLow: "from-red-500 to-rose-500",

  // TemplateCard styles
  templateCard: "relative rounded-lg overflow-hidden shadow-sm transition-all duration-300 cursor-pointer border border-slate-300",
  templateCardSelected: "ring-2 ring-[#4338CA] scale-[1.02]",
  templateCardDefault: "hover:shadow-[0_0_15px_rgba(216,56,107,0.15)] hover:border-[#4338CA]/30",
  templateDesign: "relative h-full w-full aspect-[4/5]",
  templateOverlay: "absolute inset-0 bg-slate-200/50 backdrop-blur-[1px]",
  selectionIndicator: "absolute top-4 right-4 z-20",
  selectionCircle: "w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md",
  selectionIcon: "text-white",
  templateHoverEffect: "absolute inset-0 bg-primary/3 opacity-0 hover:opacity-100 transition-opacity duration-300",
  templateName: "text-sm font-medium text-indigo-500",
  emptyTemplate: "relative h-full w-full rounded-lg overflow-hidden",
  emptyTemplateIcon: "p-3 bg-white rounded-full shadow-sm",
  emptyTemplateText: "text-xs text-indigo-500 mt-1"
};

export const authStyles = {
  container: "w-full p-6 sm:p-8",
  headerWrapper: "text-center mb-8",
  title: "text-2xl font-extrabold text-white mb-2",
  subtitle: "text-indigo-500 font-medium",
  form: "space-y-6",
  errorMessage: "text-[#4338CA] text-sm font-medium bg-[#4338CA]/10 border border-[#4338CA]/20 px-4 py-3 rounded-xl",
  submitButton: "w-full py-4 bg-[#4338CA] hover:bg-[#3730A3] text-white font-extrabold rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-[#4338CA]/20 transition-all text-lg cursor-pointer",
  switchText: "text-center text-sm text-indigo-500 font-medium",
  switchButton: "font-extrabold text-[#4338CA] hover:text-[#ff4d85] transition-colors cursor-pointer",
  signupContainer: "w-full p-6 sm:p-8",
  signupTitle: "text-2xl font-extrabold text-white mb-2",
  signupSubtitle: "text-indigo-500 font-medium",
  signupForm: "space-y-4",
  signupSubmit: "w-full py-4 bg-[#4338CA] hover:bg-[#3730A3] text-white font-extrabold rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-[#4338CA]/20 transition-all text-lg cursor-pointer",
  signupSwitchButton: "font-extrabold text-[#4338CA] hover:text-[#ff4d85] transition-colors cursor-pointer"
};

export const shimmerStyle = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  @keyframes flow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes bubble {
    0% { transform: translateY(0) scale(1); opacity: 0.7; }
    50% { transform: translateY(-10px) scale(1.1); opacity: 0.9; }
    100% { transform: translateY(0) scale(1); opacity: 0.7; }
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 4px 14px rgba(212, 87, 122, 0.1); }
    50% { box-shadow: 0 4px 20px rgba(212, 87, 122, 0.2); }
  }
  
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
  
  .animate-flow {
    animation: flow 4s infinite linear;
  }
  
  .animate-bubble {
    animation: bubble 2s infinite ease-in-out;
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 2s infinite;
  }
`
// Common Styles
export const commonStyles = {
  trashButton: "absolute top-4 right-4 p-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-all",
  addButtonBase: "flex items-center gap-3 px-6 py-3 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg",
};

// AdditionalInfoForm Styles
export const additionalInfoStyles = {
  container: "p-8 bg-app-surface rounded-2xl shadow-[0_10px_30px_rgba(216,56,107,0.05)] border border-slate-300",
  heading: "text-2xl font-extrabold text-white mb-8",
  sectionHeading: "text-lg font-bold text-indigo-400 mb-6 flex items-center gap-2",
  dotViolet: "w-2 h-2 bg-[#4338CA] rounded-full",
  dotOrange: "w-2 h-2 bg-[#ff4d85] rounded-full",
  languageItem: "relative bg-slate-200/50 border border-slate-300 p-6 rounded-2xl shadow-sm hover:shadow-[0_0_15px_rgba(216,56,107,0.15)] hover:border-[#4338CA]/30 transition-all",
  interestItem: "relative",
  addButtonLanguage: "bg-[#4338CA] hover:bg-[#3730A3]",
  addButtonInterest: "bg-[#ff4d85] hover:bg-[#4338CA]",
};

// CertificationInfoForm Styles
export const certificationInfoStyles = {
  container: "p-8 bg-app-surface rounded-2xl shadow-[0_10px_30px_rgba(216,56,107,0.05)] border border-slate-300",
  heading: "text-2xl font-extrabold text-white mb-8",
  item: "relative bg-slate-200/50 border border-slate-300 p-6 rounded-2xl shadow-sm hover:shadow-[0_0_15px_rgba(216,56,107,0.15)] hover:border-[#4338CA]/30 transition-all",
  addButton: "bg-[#4338CA] hover:bg-[#3730A3]",
};

// BasicDetailsForm Styles
export const basicDetailsStyles = {
  container: "p-8 bg-app-surface rounded-2xl shadow-[0_10px_30px_rgba(216,56,107,0.05)] border border-slate-300",
  heading: "text-2xl font-extrabold text-white mb-8",
  sectionHeading: "text-lg font-bold text-indigo-400 mb-6 flex items-center gap-2",
  dotViolet: "w-2 h-2 bg-[#4338CA] rounded-full",
  dotOrange: "w-2 h-2 bg-[#ff4d85] rounded-full",
  languageItem: "relative bg-slate-200/50 border border-slate-300 p-6 rounded-2xl shadow-sm hover:shadow-[0_0_15px_rgba(216,56,107,0.15)] hover:border-[#4338CA]/30 transition-all",
  interestItem: "relative",
  addButtonLanguage: "bg-[#4338CA] hover:bg-[#3730A3]",
  addButtonInterest: "bg-[#ff4d85] hover:bg-[#4338CA]",
};

// CustomSectionForm Styles
export const customSectionStyles = {
  container: "p-8 bg-app-surface rounded-2xl shadow-[0_10px_30px_rgba(216,56,107,0.05)] border border-slate-300",
  heading: "text-2xl font-extrabold text-white mb-8",
  item: "relative bg-slate-200/50 border border-slate-300 p-6 rounded-2xl shadow-sm hover:shadow-[0_0_15px_rgba(216,56,107,0.15)] hover:border-[#4338CA]/30 transition-all",
  addButton: "bg-[#4338CA] hover:bg-[#3730A3]",
};

// ContactInfoForm Styles
export const contactInfoStyles = {
  container: "p-8 bg-app-surface rounded-2xl shadow-[0_10px_30px_rgba(216,56,107,0.05)] border border-slate-300",
  heading: "text-2xl font-extrabold text-white mb-8",
};

// EducationDetailsForm Styles
export const educationDetailsStyles = {
  container: "p-8 bg-app-surface rounded-2xl shadow-[0_10px_30px_rgba(216,56,107,0.05)] border border-slate-300",
  heading: "text-2xl font-extrabold text-white mb-8",
  item: "relative bg-slate-200/50 border border-slate-300 p-6 rounded-2xl shadow-sm hover:shadow-[0_0_15px_rgba(216,56,107,0.15)] hover:border-[#4338CA]/30 transition-all",
  addButton: "bg-[#4338CA] hover:bg-[#3730A3]",
};

// ProfileInfoForm Styles
export const profileInfoStyles = {
  container: "p-8 bg-app-surface rounded-2xl shadow-[0_10px_30px_rgba(216,56,107,0.05)] border border-slate-300",
  heading: "text-2xl font-extrabold text-white mb-8",
  textarea: "w-full p-4 bg-slate-200/50 border border-slate-300 rounded-xl focus:border-[#4338CA]/50 focus:ring-4 focus:ring-[#4338CA]/10 transition-all outline-none resize-none text-white placeholder:text-indigo-400",
};

// ProjectDetailForm Styles
export const projectDetailStyles = {
  container: "p-8 bg-app-surface rounded-2xl shadow-[0_10px_30px_rgba(216,56,107,0.05)] border border-slate-300",
  heading: "text-2xl font-extrabold text-white mb-8",
  item: "relative bg-slate-200/50 border border-slate-300 p-6 rounded-2xl shadow-sm hover:shadow-[0_0_15px_rgba(216,56,107,0.15)] hover:border-[#4338CA]/30 transition-all",
  textarea: "w-full p-4 bg-slate-200/50 border border-slate-300 rounded-xl focus:border-[#4338CA]/50 focus:ring-4 focus:ring-[#4338CA]/10 transition-all outline-none resize-none text-white placeholder:text-indigo-400",
  addButton: "bg-[#4338CA] hover:bg-[#3730A3]",
};

// SkillsInfoForm Styles
export const skillsInfoStyles = {
  container: "p-8 bg-app-surface rounded-2xl shadow-[0_10px_30px_rgba(216,56,107,0.05)] border border-slate-300",
  heading: "text-2xl font-extrabold text-white mb-8",
  item: "relative bg-slate-200/50 border border-slate-300 p-6 rounded-2xl shadow-sm hover:shadow-[0_0_15px_rgba(216,56,107,0.15)] hover:border-[#4338CA]/30 transition-all",
  addButton: "bg-[#4338CA] hover:bg-[#3730A3]",
};

// WorkExperienceForm Styles
export const workExperienceStyles = {
  container: "p-8 bg-app-surface rounded-2xl shadow-[0_10px_30px_rgba(216,56,107,0.05)] border border-slate-300",
  heading: "text-2xl font-extrabold text-white mb-8",
  item: "relative bg-slate-200/50 border border-slate-300 p-6 rounded-2xl shadow-sm hover:shadow-[0_0_15px_rgba(216,56,107,0.15)] hover:border-[#4338CA]/30 transition-all",
  textarea: "w-full p-4 bg-slate-200/50 border border-slate-300 rounded-xl focus:border-[#4338CA]/50 focus:ring-4 focus:ring-[#4338CA]/10 transition-all outline-none resize-none text-white placeholder:text-indigo-400",
  addButton: "bg-[#4338CA] hover:bg-[#3730A3]",
};

export const containerStyles = {
  main: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
  header: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-app-surface border border-slate-300 rounded-2xl py-4 px-6 mb-6 shadow-sm",
  grid: "grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8",
  formContainer: "bg-transparent rounded-2xl overflow-hidden",
  previewContainer: "bg-app-surface border border-slate-300 rounded-2xl overflow-hidden shadow-sm p-4",
  previewInner: "w-full max-w-[800px] mx-auto",
  modalContent: "w-[90vw] h-[80vh]",
  pdfPreview: "w-full p-4 flex justify-center",
  hiddenThumbnail: "bg-white shadow-lg max-w-[400px] mx-auto",
  error: "flex items-center gap-3 text-sm font-medium text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3 rounded-xl mb-4"
};

export const buttonStyles = {
  theme: "flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#4338CA]/10 text-[#4338CA] font-bold rounded-xl hover:bg-[#4338CA]/20 border border-[#4338CA]/20 transition-all cursor-pointer",
  delete: "flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-500/10 text-red-500 font-bold rounded-xl hover:bg-red-500/20 border border-red-500/20 transition-all cursor-pointer",
  download: "flex items-center gap-2 px-3 sm:px-4 py-2 bg-secondary/8 text-primary font-bold rounded-xl hover:bg-secondary/15 border border-secondary/15 transition-all cursor-pointer",
  back: "flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-app-surface text-indigo-400 font-bold rounded-xl hover:bg-slate-200/50 border border-slate-300 transition-all text-sm cursor-pointer",
  save: "flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary/8 text-primary font-bold rounded-xl hover:bg-primary/15 border border-primary/15 transition-all text-sm cursor-pointer",
  next: "flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-primary/15 text-sm cursor-pointer",
  modalAction: "flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-primary/15 text-sm cursor-pointer"
};

export const toggleSwitchStyles = {
  container: 'flex items-center justify-between p-4 bg-app-surface rounded-xl border border-slate-300 hover:border-primary/20 transition-colors',
  label: 'text-sm font-medium text-indigo-400',
  modalBadge: "inline-flex items-center gap-2 bg-[#4338CA]/10 border border-[#4338CA]/20 px-3 py-1 rounded-full text-sm font-medium text-[#4338CA]",
  error: "flex items-center gap-3 text-sm font-medium text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3 rounded-xl mb-4"
};

export const statusStyles = {
  completionBadge: "inline-flex items-center gap-2 bg-app-surface border border-slate-300 px-3 py-1 rounded-full text-sm font-medium text-indigo-400",
  modalBadge: "inline-flex items-center gap-2 bg-[#4338CA]/10 border border-[#4338CA]/20 px-3 py-1 rounded-full text-sm font-medium text-[#4338CA]",
};

export const iconStyles = {
  pulseDot: "w-2 h-2 rounded-full bg-[#4338CA] animate-pulse"
};

export const inputStyles = {
  wrapper: "mb-6 group",
  label: "block text-sm font-bold text-indigo-500 mb-3 group-focus-within:text-[#4338CA] transition-colors",
  inputContainer: focused => `relative flex items-center bg-slate-200/50 border px-4 py-3 rounded-xl transition-all duration-300 ${focused ? 'border-[#4338CA]/40 ring-4 ring-[#4338CA]/10 shadow-[0_0_15px_rgba(216,56,107,0.1)]' : 'border-slate-300 hover:border-white/20'}`,
  inputField: "w-full bg-transparent outline-none text-white placeholder-stone-500 font-medium",
  toggleButton: "text-indigo-400 hover:text-[#4338CA] transition-colors p-1 rounded-lg hover:bg-slate-200/50",
};

export const photoSelectorStyles = {
  container: "flex justify-center mb-8",
  hiddenInput: "hidden",
  placeholder: hovered => `relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center bg-slate-200/50 border-2 border-dashed border-white/20 rounded-full cursor-pointer transition-all duration-300 ${hovered ? 'hover:border-[#4338CA]/40 hover:bg-[#4338CA]/5' : ''}`,
  cameraButton: "absolute -bottom-2 -right-2 w-12 h-12 flex items-center justify-center bg-[#4338CA] hover:bg-[#3730A3] text-white rounded-full transition-all shadow-[0_0_20px_rgba(216,56,107,0.3)] hover:scale-110",
  previewWrapper: "relative group",
  previewImageContainer: hovered => `w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-slate-300 shadow-[0_0_20px_rgba(216,56,107,0.15)] transition-all duration-300 ${hovered ? 'group-hover:border-[#4338CA]/30' : ''}`,
  previewImage: "w-full h-full object-cover cursor-pointer group-hover:scale-110 transition-transform duration-300",
  overlay: "absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2",
  actionButton: (bg, hoverBg, textColor) => `w-10 h-10 flex items-center justify-center bg-slate-200 text-white rounded-full hover:bg-white/20 transition-all border border-white/20`,
};

export const titleInputStyles = {
  container: "flex items-center gap-3",
  titleText: "text-lg sm:text-xl font-bold text-white",
  editButton: "p-2 rounded-xl bg-slate-200/50 hover:bg-slate-200 border border-slate-300 transition-all group",
  editIcon: "w-5 h-5 text-indigo-500 group-hover:text-[#4338CA] transition-colors",
  inputField: focused => `text-lg sm:text-xl font-bold bg-transparent outline-none text-white border-b-2 pb-2 transition-all duration-300 ${focused ? 'border-[#4338CA]' : 'border-white/20'}`,
  confirmButton: "p-2 rounded-xl bg-[#4338CA]/10 hover:bg-[#4338CA]/20 text-[#4338CA] transition-all",
};

export const modalStyles = {
  overlay: "fixed inset-0 flex items-center justify-center w-full h-full bg-black/60 backdrop-blur-md z-50",
  container: "relative flex flex-col bg-app-surface shadow-[0_0_50px_rgba(216,56,107,0.15)] rounded-3xl overflow-hidden border border-slate-300 max-w-[95vw] max-h-[95vh]",
  header: "flex items-center justify-between p-6 border-b border-slate-300 bg-slate-200/50",
  title: "text-xl font-extrabold text-white",
  actionButton: "flex items-center gap-2 px-6 py-3 bg-[#4338CA] hover:bg-[#3730A3] text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-[#4338CA]/20 mr-12",
  closeButton: "absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-slate-200/50 hover:bg-slate-200 text-indigo-500 hover:text-white rounded-xl transition-all shadow-sm hover:scale-110 z-10 border border-slate-300",
  body: "flex-1 overflow-y-auto"
};

export const infoStyles = {
  // Progress
  progressWrapper: "w-20 h-2 rounded-full bg-slate-200",
  progressBar: () => `h-full rounded-full transition-all`,

  // ActionLink
  actionWrapper: "flex items-center gap-3",
  actionIconWrapper: "w-6 h-6 flex items-center justify-center rounded-full",
  actionLink: "text-sm font-medium underline cursor-pointer break-all text-indigo-500 hover:text-primary transition-colors",

  // CertificationInfo
  certContainer: "mb-4",
  certTitle: "text-base font-semibold text-white",
  certRow: "flex items-center gap-2 mt-1",
  certYear: () => `text-xs font-bold text-white px-3 py-1 rounded-lg`,
  certIssuer: "text-sm text-indigo-500 font-medium",

  // ContactInfo
  contactRow: "flex items-center gap-3 mb-3",
  contactIconWrapper: "w-8 h-8 flex items-center justify-center rounded-lg",
  contactText: "flex-1 text-sm font-medium break-all text-indigo-400",

  // EducationInfo
  eduContainer: "mb-5",
  eduDegree: "text-base font-semibold pb-2 text-white",
  eduInstitution: "text-sm text-indigo-500 font-medium",
  eduDuration: "text-xs text-indigo-400 font-medium italic mt-1",

  // Language/Skill Info
  infoRow: "flex items-center justify-between mb-3",
  infoLabel: "text-sm font-semibold text-indigo-400",

  // Links
  linkRow: "flex items-center space-x-1 hover:text-[#4338CA]",

  // ProjectInfo
  projectContainer: "mb-5",
  projectTitle: isPreview => `${isPreview ? 'text-sm' : 'text-base'} font-semibold text-white`,
  projectDesc: "text-sm text-indigo-500 mt-1 leading-relaxed",
  projectLinks: "flex items-center gap-4 font-medium mt-3",

  // RatingInput
  ratingWrapper: "flex gap-2 cursor-pointer",
  ratingDot: "w-4 h-4 rounded transition-all hover:scale-110",

  // SkillSection
  skillGrid: "grid grid-cols-2 gap-x-6 gap-y-2 mb-5",
  skillCategory: "col-span-2 text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3 border-b border-slate-300 pb-2 mt-4",
  skillItem: "flex items-center gap-2 py-1",
  skillText: "text-sm text-white font-medium",
  skillLevel: "ml-auto flex gap-1",

  // EmptyState
  emptyStateWrapper: "flex flex-col items-center justify-center py-12 px-4 text-center bg-slate-200/50 border border-slate-300 border-dashed rounded-2xl mx-6 mb-6",
  emptyIconWrapper: "w-16 h-16 bg-[#4338CA]/10 rounded-full flex items-center justify-center mb-4 text-[#4338CA]",
  emptyTitle: "text-xl font-bold text-white mb-2",
  emptyText: "text-indigo-500 mb-6 max-w-sm",
  addFirstButton: "bg-[#4338CA] hover:bg-[#3730A3]",

  // InfoForm specific layout
  formGrid: "grid grid-cols-1 md:grid-cols-2 gap-x-6",
  fullWidth: "col-span-1 md:col-span-2",

  // WorkExperience
  workContainer: "mb-6",
  workHeader: "flex items-start justify-between mb-2",
  workCompany: "text-base font-semibold pb-2 text-white",
  workRole: "text-base font-medium text-indigo-400",
  workDuration: () => `text-sm font-bold italic text-indigo-400`,
  workDesc: "text-sm text-indigo-500 font-medium leading-relaxed"
};