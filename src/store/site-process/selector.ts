import { StoreSlice } from '../../const';
import type { State } from '../../types/state';

export const getGenre = ({ [StoreSlice.SiteProcess]: SITE_PROCESS }: State): string => SITE_PROCESS.genre;
