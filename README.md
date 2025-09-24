
# Netflix GPT

- Created app using vite
- Configered TailwindCSS 
- Header
- Routing
- Login Form
- Sign Up form
- Form Validation
- useRef Hook
- Firebase setup
- Deploying our app to production
- Create Sign Up in firebase (user account)
- Implemented Sign In user API
- Created REDUX store with user Slice
- Implemented Signout
- Updated profile with user name
- Fixed bug: redirect user if user not logged in redirect to login pae and vise versa
- Fetch Movies from TMDB


# Features: 
- Login/Sign Up
    - Sign In/ Sign Up form
    - Redirect to Browse Page
- Browse Page (after authentication)
    - Header
    - Main Movie
        - Tailer in BG
        - Title & Description
        - Movie Suggestions
            - Movie List X N

- NetflixGPT
    -Search Bar
    - Movie Suggestions


## Learning

- Controlled form and Uncontrolled Form: Controlled vs. uncontrolled describes who owns the input’s value.
In a controlled input, React state is the single source of truth: the value flows from state → input, and every keystroke triggers an onChange that updates state. That makes live validation, conditional UI, and predictable resets trivial. In an uncontrolled input, the DOM owns the value: I read it via a ref when I need it (e.g., on submit). That avoids re-rendering on every keystroke and is great for large forms or simple ‘read-on-submit’ cases. File inputs are a classic uncontrolled example.

- Controlled (state) when I need:
    - Live validation/formatting, disabling buttons, dependent fields
    - Single source of truth for logic, SSR, and tests
    - Easy programmatic resets (set state)

- Uncontrolled (ref) when:
    - I only need values at submit/blur
    - There are many fields and perf matters (fewer re-renders)
    - Interop with third-party widgets; file inputs

- Controlled: +predictable, +easy validation; −more re-renders on type
- Uncontrolled: +perf on big forms; −harder live UX, manual resets
- Don’t mix modes for the same field (React warns about switching controlled↔uncontrolled).
- value without an onChange makes the input read-only.
- Use value for controlled, defaultValue for uncontrolled.
- To reset uncontrolled fields, use form.reset() or set ref.current.value.

- “For a login form with instant error messages and a disabled submit until valid, I use controlled inputs. For a 30-field admin form where we only validate on submit, I use uncontrolled (or a library like react-hook-form, which is uncontrolled under the hood) to minimize re-renders.”
- If they probe deeper, add: “Formik historically leans controlled; react-hook-form is uncontrolled for perf. I pick based on validation style and scale.”