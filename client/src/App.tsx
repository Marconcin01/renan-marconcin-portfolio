import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
<<<<<<< HEAD
=======
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
>>>>>>> 513f6348cf4ef24bdeb8da40ddd7599735075fd5


function Router() {
  return (
    <Switch>
<<<<<<< HEAD
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
=======
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/404" component={NotFound} />
>>>>>>> 513f6348cf4ef24bdeb8da40ddd7599735075fd5
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
