// Manages CSS classes for input fields based on user interactions

(function() {
    'use strict';

    // Configuration object for easy customization
    const CONFIG = {
        classes: {
            pristine: 'input-state-is-pristine',
            dirty: 'input-state-is-dirty',
            focused: 'input-state-is-focused',
            blurred: 'input-state-is-blurred',
            empty: 'input-state-is-empty',
            notEmpty: 'input-state-is-not-empty'
        },
        selectors: {
            inputs: 'input[type="text"], input[type="email"], input[type="tel"], input[type="password"], input[type="date"], input[type="number"], input[type="url"], input[type="search"], textarea, select',
            cf7Fields: '.field-cf7, .textarea-cf7'
        }
    };

    /**
     * Input State Manager Class
     */
    class InputStateManager {
        constructor(config = {}) {
            this.config = { ...CONFIG, ...config };
            this.init();
        }

        /**
         * Initialize the state manager
         */
        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        }

        /**
         * Setup all input fields
         */
        setup() {
            this.setupDirectInputs();
            this.setupCF7Fields();
        }

        /**
         * Apply initial state to an element
         */
        initializeState(element) {
            const { classes } = this.config;
            
            element.classList.add(classes.pristine, classes.blurred, classes.empty);
            element.classList.remove(classes.dirty, classes.focused, classes.notEmpty);
        }

        /**
         * Handle focus state
         */
        handleFocus(element) {
            const { classes } = this.config;
            
            element.classList.remove(classes.pristine, classes.blurred);
            element.classList.add(classes.dirty, classes.focused);
        }

        /**
         * Handle blur state
         */
        handleBlur(element) {
            const { classes } = this.config;
            
            element.classList.remove(classes.focused);
            element.classList.add(classes.blurred);
        }

        /**
         * Handle input value changes
         */
        handleInput(element, inputElement = element) {
            const { classes } = this.config;
            const hasValue = this.hasValue(inputElement);
            
            if (hasValue) {
                element.classList.remove(classes.pristine, classes.empty);
                element.classList.add(classes.dirty, classes.notEmpty);
            } else {
                element.classList.remove(classes.notEmpty);
                element.classList.add(classes.empty);
            }
        }

        /**
         * Check if input has a value
         */
        hasValue(input) {
            if (!input) return false;
            
            const value = input.value || '';
            return value.trim().length > 0;
        }

        /**
         * Add event listeners to an element
         */
        addEventListeners(targetElement, inputElement = targetElement) {
            // Prevent duplicate listeners
            if (inputElement.hasAttribute('data-state-managed')) {
                return;
            }
            
            inputElement.setAttribute('data-state-managed', 'true');

            inputElement.addEventListener('focus', () => {
                this.handleFocus(targetElement);
            });

            inputElement.addEventListener('blur', () => {
                this.handleBlur(targetElement);
            });

            inputElement.addEventListener('input', () => {
                this.handleInput(targetElement, inputElement);
            });

            // Handle initial state based on existing value
            if (this.hasValue(inputElement)) {
                this.handleInput(targetElement, inputElement);
            }
        }

        /**
         * Setup direct input fields
         */
        setupDirectInputs() {
            const inputs = document.querySelectorAll(this.config.selectors.inputs);
            
            inputs.forEach(input => {
                this.initializeState(input);
                this.addEventListeners(input);
            });
        }

        /**
         * Setup Contact Form 7 fields
         */
        setupCF7Fields() {
            const cf7Fields = document.querySelectorAll(this.config.selectors.cf7Fields);
            
            cf7Fields.forEach(field => {
                const input = field.querySelector('input') || field.querySelector('textarea') || field.querySelector('select');
                
                if (input) {
                    this.initializeState(field);
                    this.addEventListeners(field, input);
                }
            });
        }

        /**
         * Reinitialize - useful for dynamically added content
         */
        reinitialize() {
            this.setup();
        }

        /**
         * Update configuration
         */
        updateConfig(newConfig) {
            this.config = { ...this.config, ...newConfig };
        }
    }

    // Initialize the Input State Manager
    const inputStateManager = new InputStateManager();

    // Expose globally for external access if needed
    window.InputStateManager = {
        instance: inputStateManager,
        reinitialize: () => inputStateManager.reinitialize(),
        updateConfig: (config) => inputStateManager.updateConfig(config)
    };

})();
