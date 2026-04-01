import { Code, MessageCircle, Video, PlaySquare, Briefcase } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <PlaySquare className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold tracking-tighter">VidMaxx</span>
            </div>
            <p className="text-sm leading-6 text-muted-foreground max-w-xs">
              The ultimate AI video generator and scheduler. Grow your audience on autopilot across all platforms.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">YouTube</span>
                <Video className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">GitHub</span>
                <Code className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">LinkedIn</span>
                <Briefcase className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">Features</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">Integrations</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">Pricing</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">Changelog</a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">Pricing</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">Documentation</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">Guides</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">API Status</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">About</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">Blog</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">Jobs</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">Partners</a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">Privacy</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">Terms</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-border pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs leading-5 text-muted-foreground">
              &copy; {new Date().getFullYear()} VidMaxx, Inc. All rights reserved.
            </p>
            
            {/* Newsletter */}
            <form className="flex w-full max-w-sm items-center gap-2">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-muted/50 px-3.5 py-2 text-foreground shadow-sm ring-1 ring-inset ring-border focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
