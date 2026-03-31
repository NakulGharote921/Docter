const getCurrentOrigin = () => {
  if (typeof window === "undefined") {
    return "this site";
  }

  return window.location.origin;
};

export const getFirebaseAuthErrorMessage = (error) => {
  const origin = getCurrentOrigin();

  switch (error?.code) {
    case "auth/unauthorized-domain":
      return `Google sign-in is blocked for ${origin}. Add this domain in Firebase Console > Authentication > Settings > Authorized domains, then try again.`;
    case "auth/popup-closed-by-user":
      return "Google sign-in was canceled before it finished.";
    case "auth/popup-blocked":
      return "The browser blocked the Google sign-in popup. Allow popups and try again.";
    default:
      return error?.message || "Authentication failed";
  }
};
