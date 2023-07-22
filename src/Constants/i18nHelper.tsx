import { useTranslation } from "react-i18next"

export const useProductionSystemOptsI18n = (): Record<string, string> => {
  const { t } = useTranslation(['sellerForm', 'validation']);

  return {
    'Aviary: multi-level cage-free system': t('aviary')  + ': ' + t('multi-level-cage-free-system'),
    'Barn: single-level cage-free system': t('barn') + ': ' + t('single-level-cage-free-system'),
    'Fixed housing: structure does not move': t('fixed-housing') + ': ' + t('structure-does-not-move'),
    'Free-range: cage-free system that provides outdoor access': t('freerange') + ': ' + t('cage-free-system-that-provides-outdoor-access'),
    'Mobile unit: house or structure on wheels': t('mobile-unit') + ': ' + t('house-or-structure-on-wheels')
  }
}