# Implement step (continue after Codex and Cursor usage limits) — text-field / mobile

Project root: /Users/hassansaid/Downloads/Biowave Design System-text-field-mobile/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
5-mobile-components/components/text-field/text-field-contract.md only (plus AGENTS.md).

## Outputs (write only these)
The files in contract §9, plus C8 Execution log in 5-mobile-components/components/text-field/text-field.md. Also: Code status in the text-field.md header and in 5-mobile-components/README.md (In progress → Built), and one entry at the top of CHANGELOG.md in the standard `## [...] — date` / `### Added` shape.

## This step
Build `text-field` for mobile (Flutter, package `5-mobile-components`) exactly from the contract: create the files in §9, export from the package entry file (keep the export list alphabetical, do not reformat anything else), use only the tokens in §4, write the tests in §10, run the commands in §13. Fill C8 and set Code to `Built`. BwButton, BwIcon and BwIconButton are already built and approved in this package — reuse them; change them only where the contract says so (e.g. an internal parameter it names), and list that change in C8.

Other agents are building other components in other worktrees at the same time. Touch nothing outside this unit's files, the package entry export line, the section README row for this unit and one CHANGELOG entry. Write your execution log only in C8 (never D11, which belongs to the Figma Agent).

Accessibility lessons from Icon button review: every interactive part must expose one labelled semantics node that carries the tap action and focus state/action (screen readers and keyboard), and tests must prove it (`tester.semantics.tap`, isFocused after Tab).

## Notes from the user
Step 01 (Codex) stopped at its usage limit (step 02, Cursor, could not start — usage limit) before finishing (Code still `In progress`, no C8, no CHANGELOG, no Handoff). Its widget code under lib/src/components/text_field/ compiles; test/text_field_test.dart does not. `flutter analyze` errors (all in the test file):
```
Evaluation of this constant expression throws an exception • test/text_field_test.dart:34:15 • const_eval_throws_exception
Evaluation of this constant expression throws an exception • test/text_field_test.dart:38:15 • const_eval_throws_exception
Evaluation of this constant expression throws an exception • test/text_field_test.dart:42:15 • const_eval_throws_exception
Evaluation of this constant expression throws an exception • test/text_field_test.dart:46:15 • const_eval_throws_exception
Evaluation of this constant expression throws an exception • test/text_field_test.dart:70:15 • const_eval_throws_exception
The getter 'contentMax' isn't defined for the type 'BwLayout'. Try importing the library that defines 'contentMax', correcting the name to the name of an existing getter, or defining a getter or field
The property 'contentMax' can't be accessed on the type 'BwLayout' in a constant expression • test/text_field_test.dart:138:18 • const_eval_property_access
The getter 'contentMax' isn't defined for the type 'BwLayout'. Try importing the library that defines 'contentMax', correcting the name to the name of an existing getter, or defining a getter or field
The property 'contentMax' can't be accessed on the type 'BwLayout' in a constant expression • test/text_field_test.dart:168:18 • const_eval_property_access
The getter 'contentMax' isn't defined for the type 'BwLayout'. Try importing the library that defines 'contentMax', correcting the name to the name of an existing getter, or defining a getter or field
The getter 'focusNode' isn't defined for the type 'TextFormField'. Try importing the library that defines 'focusNode', correcting the name to the name of an existing getter, or defining a getter or fi
The getter 'obscureText' isn't defined for the type 'TextFormField'. Try importing the library that defines 'obscureText', correcting the name to the name of an existing getter, or defining a getter o
The getter 'obscureText' isn't defined for the type 'TextFormField'. Try importing the library that defines 'obscureText', correcting the name to the name of an existing getter, or defining a getter o
The getter 'focusNode' isn't defined for the type 'TextFormField'. Try importing the library that defines 'focusNode', correcting the name to the name of an existing getter, or defining a getter or fi
The getter 'focusNode' isn't defined for the type 'TextFormField'. Try importing the library that defines 'focusNode', correcting the name to the name of an existing getter, or defining a getter or fi
The argument type 'SemanticsFinder' can't be assigned to the parameter type 'FinderBase<Element>'.  • test/text_field_test.dart:493:47 • argument_type_not_assignable
The argument type 'SemanticsFinder' can't be assigned to the parameter type 'FinderBase<Element>'.  • test/text_field_test.dart:512:44 • argument_type_not_assignable
The argument type 'SemanticsFinder' can't be assigned to the parameter type 'FinderBase<Element>'.  • test/text_field_test.dart:534:17 • argument_type_not_assignable
The argument type 'SemanticsFinder' can't be assigned to the parameter type 'FinderBase<Element>'.  • test/text_field_test.dart:543:31 • argument_type_not_assignable
The getter 'focusNode' isn't defined for the type 'TextFormField'. Try importing the library that defines 'focusNode', correcting the name to the name of an existing getter, or defining a getter or fi
The property 'contentMax' can't be accessed on the type 'BwLayout' in a constant expression • test/text_field_test.dart:598:18 • const_eval_property_access
The getter 'contentMax' isn't defined for the type 'BwLayout'. Try importing the library that defines 'contentMax', correcting the name to the name of an existing getter, or defining a getter or field
```
Keep what matches the contract and finish: make the tests compile and pass (assert through the widget's public API / `tester.widget<TextField>` / `find.semantics` APIs that exist in this Flutter version — do not weaken what the tests check), run every check yourself until all pass, generate goldens with `flutter test --update-goldens` only if §9 lists a goldens folder and look at each PNG. Then fill C8, set Code → `Built` (header + README row), add the CHANGELOG entry and end with the Handoff block. Keep test/no_legacy_icons_test.dart passing.

## Checks to run
- npm run docs:check
- cd 5-mobile-components && flutter analyze && flutter test

Do not commit, push or switch branches. End with the Handoff block.
