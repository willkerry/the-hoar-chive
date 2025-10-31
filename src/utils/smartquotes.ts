export interface SmartQuotesOptions {
    /** Convert single quotes (default: true) */
    single?: boolean;
    /** Convert double quotes (default: true) */
    double?: boolean;
    /** Convert apostrophes (default: true) */
    apostrophes?: boolean;
    /** Convert primes for measurements (default: true) */
    primes?: boolean;
  }
  
  const defaultOptions: Required<SmartQuotesOptions> = {
    single: true,
    double: true,
    apostrophes: true,
    primes: true,
  };
  
  /**
   * Convert straight quotes to smart/curly quotes
   */
  export function smartquotes(text: string, options: SmartQuotesOptions = {}): string {
    const opts = { ...defaultOptions, ...options };
    let result = text;
  
    if (opts.double) {
      // Opening double quotes - after whitespace, punctuation, or at start
      result = result.replace(/(^|[\s\(\[\{—–-])"(?=\S)/g, '$1"');
      
      // Closing double quotes - before whitespace, punctuation, or at end
      result = result.replace(/(\S)"(?=[\s\)\]\},.;:!?—–-]|$)/g, '$1"');
      
      // Remaining quotes (context-dependent fallback)
      result = result.replace(/"(?=\w)/g, '"'); // Opening if before word
      result = result.replace(/(\w)"/g, '$1"'); // Closing if after word
    }
  
    if (opts.single) {
      // Opening single quotes - after whitespace, punctuation, or at start
      result = result.replace(/(^|[\s\(\[\{—–-])'(?=\S)/g, "$1'");
      
      // Closing single quotes - before whitespace, punctuation, or at end
      result = result.replace(/(\S)'(?=[\s\)\]\},.;:!?—–-]|$)/g, "$1'");
    }
  
    if (opts.apostrophes) {
      // Apostrophes in contractions and possessives
      result = result.replace(/(\w)'(\w)/g, "$1'$2");
      
      // Special cases for abbreviated years and places
      result = result.replace(/(\s)'(\d{2})/g, "$1'$2"); // '99, '13
      result = result.replace(/(\s)'([a-z]+)/gi, "$1'$2"); // 'burbs, 'til
    }
  
    if (opts.primes) {
      // Feet and inches (preserve these as primes, not quotes)
      result = result.replace(/(\d+)'/g, '$1′'); // foot/minute mark
      result = result.replace(/(\d+)"/g, '$1″'); // inch/second mark
    }
  
    return result;
  }
  
  /**
   * Removes smart quotes and converts back to straight quotes
   */
  export function removeSmartQuotes(text: string): string {
    return text
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'")
      .replace(/[′]/g, "'")
      .replace(/[″]/g, '"');
  }
  
  /**
   * Check if text contains smart quotes
   */
  export function hasSmartQuotes(text: string): boolean {
    return /[""''′″]/.test(text);
  }
  
  // Default export
  export default smartquotes;