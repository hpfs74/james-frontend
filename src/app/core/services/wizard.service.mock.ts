export const KNXWizardServiceMock = {
  currentStepRoute: () => {},
  nextStepRoute: () => {},
  prevStepRoute: () => {},
  getStepRouteByIndex: (index: number) => {
    return this.currentStepRoutes[index];
  },
  currentStepRoutes: [],
  goToNextStep: () => {},
  goToPrevStep: () => {},
  goToStep: (stepIndex: number) => {},
  navigate: (route: any) => {}
};
