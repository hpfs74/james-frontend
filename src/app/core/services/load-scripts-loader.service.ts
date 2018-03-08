import { LoadScriptsService } from 'app/core/services/load-scripts.service';

export function LoadScriptLoaderService(loadScriptsService: LoadScriptsService) {
  return () => loadScriptsService.load();
}
