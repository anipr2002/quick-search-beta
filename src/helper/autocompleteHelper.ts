import Fuse from 'fuse.js';
import { Website } from '../types/website';

interface AutocompleteOptions {
  websiteData: Website[];
  input: string;
}

export const getAutocompleteSuggestions = ({ websiteData, input }: AutocompleteOptions): Website[] => {
  const options = {
    keys: ['name'],
    threshold: 0.50, // Adjust the threshold based on your requirements
  };

  const fuse = new Fuse(websiteData, options);
  const results = fuse.search(input);

  return results.map((result) => result.item);
};
