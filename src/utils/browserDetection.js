export const startBrowserDetection = () => {
    const userAgent = navigator.userAgent;

    // Detection logic
    const isFirefox = userAgent.toLowerCase().includes('firefox');
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);

    const browser = isFirefox ? 'firefox' : isSafari ? 'safari' : 'other';
    document.body.setAttribute('data-browser', browser);
};
