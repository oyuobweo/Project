# Changelog

## [2026-04-10] GitHub Settings Integration & Project Reorganization
### Added
- `.github/` folder: Integrated workflows (CI/CI), Issue templates, and Pull Request templates from `everything-claude-code`.
- `.claude/rules/ENGINEERING_STANDARDS.md`: technical coding styles and standards.
- `.claude/rules/WEB_BEST_PRACTICES.md`: React/Web development patterns and hooks guidance.
- `docs/adr/`: Directory for Architectural Decision Records.
- `docs/plans/`: Organized directory for task implementation plans.

### Changed
- Reorganized `docs/`: Moved legacy plan files to `docs/plans/`.
- Cleaned up root directory: Moved redundant ZIP backups to `backups/`.
- Standardized rule management: Modularized project rules within `.claude/rules/`.

### Fixed
- Sync mismatch between local agent rules and GitHub repository settings.
