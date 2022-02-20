import { createSelector } from 'reselect';

export const getPrompterState = state => state.prompter;

export const isItShowingDialog = createSelector([getPrompterState], pr => pr.show);

export const getDialogTitle = createSelector([getPrompterState], pr => pr.title);

export const getDialogMessage = createSelector([getPrompterState], pr => pr.description);

export const getPromptResolve = createSelector([getPrompterState], pr => pr.promise);

export const getDialogChoices = createSelector([getPrompterState], pr => pr.choices);

export const getDialogChoiceValues = createSelector([getDialogChoices], ch => Object.keys(ch));

export const getDialogChoiceLabels = createSelector(
  [getDialogChoices, getDialogChoiceValues],
  (ch, chvals) => chvals.map(c => ch[c].label),
);

export const getDialogAnswer = createSelector([getPrompterState], pr => pr.answer);

export const getDialogAnswerProps = createSelector(
  [getDialogChoices, getDialogAnswer],
  (ch, ans) => ({ ...ch[ans], value: ans }),
);

export const getDialogDefaultAnswer = createSelector(
  [getDialogChoices, getDialogChoiceValues],
  (ch, chvals) => chvals.filter(c => ch[c].default || false)[0] || null,
);
