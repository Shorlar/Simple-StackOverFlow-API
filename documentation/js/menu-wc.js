'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">assesment documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-bd9d939edb33a479ffab09d53d536bba5fbbdf79b15282b63058d9b56e6b6313876d310718e0401d6228b03855a0ac05370cb0a209d48d4462c1fa9abbfd2823"' : 'data-target="#xs-controllers-links-module-AppModule-bd9d939edb33a479ffab09d53d536bba5fbbdf79b15282b63058d9b56e6b6313876d310718e0401d6228b03855a0ac05370cb0a209d48d4462c1fa9abbfd2823"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-bd9d939edb33a479ffab09d53d536bba5fbbdf79b15282b63058d9b56e6b6313876d310718e0401d6228b03855a0ac05370cb0a209d48d4462c1fa9abbfd2823"' :
                                            'id="xs-controllers-links-module-AppModule-bd9d939edb33a479ffab09d53d536bba5fbbdf79b15282b63058d9b56e6b6313876d310718e0401d6228b03855a0ac05370cb0a209d48d4462c1fa9abbfd2823"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-bd9d939edb33a479ffab09d53d536bba5fbbdf79b15282b63058d9b56e6b6313876d310718e0401d6228b03855a0ac05370cb0a209d48d4462c1fa9abbfd2823"' : 'data-target="#xs-injectables-links-module-AppModule-bd9d939edb33a479ffab09d53d536bba5fbbdf79b15282b63058d9b56e6b6313876d310718e0401d6228b03855a0ac05370cb0a209d48d4462c1fa9abbfd2823"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-bd9d939edb33a479ffab09d53d536bba5fbbdf79b15282b63058d9b56e6b6313876d310718e0401d6228b03855a0ac05370cb0a209d48d4462c1fa9abbfd2823"' :
                                        'id="xs-injectables-links-module-AppModule-bd9d939edb33a479ffab09d53d536bba5fbbdf79b15282b63058d9b56e6b6313876d310718e0401d6228b03855a0ac05370cb0a209d48d4462c1fa9abbfd2823"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StackApiModule.html" data-type="entity-link" >StackApiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-StackApiModule-5aef7e72d86ea980c9b854534fe337342a57db457a0160952be8c126f77ecb06b4fb97e66e1326a9b46308ef7c1c626dd3718f435cf3c7f699a16026226475fc"' : 'data-target="#xs-controllers-links-module-StackApiModule-5aef7e72d86ea980c9b854534fe337342a57db457a0160952be8c126f77ecb06b4fb97e66e1326a9b46308ef7c1c626dd3718f435cf3c7f699a16026226475fc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StackApiModule-5aef7e72d86ea980c9b854534fe337342a57db457a0160952be8c126f77ecb06b4fb97e66e1326a9b46308ef7c1c626dd3718f435cf3c7f699a16026226475fc"' :
                                            'id="xs-controllers-links-module-StackApiModule-5aef7e72d86ea980c9b854534fe337342a57db457a0160952be8c126f77ecb06b4fb97e66e1326a9b46308ef7c1c626dd3718f435cf3c7f699a16026226475fc"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/QuestionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuestionController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/VoteController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VoteController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StackApiModule-5aef7e72d86ea980c9b854534fe337342a57db457a0160952be8c126f77ecb06b4fb97e66e1326a9b46308ef7c1c626dd3718f435cf3c7f699a16026226475fc"' : 'data-target="#xs-injectables-links-module-StackApiModule-5aef7e72d86ea980c9b854534fe337342a57db457a0160952be8c126f77ecb06b4fb97e66e1326a9b46308ef7c1c626dd3718f435cf3c7f699a16026226475fc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StackApiModule-5aef7e72d86ea980c9b854534fe337342a57db457a0160952be8c126f77ecb06b4fb97e66e1326a9b46308ef7c1c626dd3718f435cf3c7f699a16026226475fc"' :
                                        'id="xs-injectables-links-module-StackApiModule-5aef7e72d86ea980c9b854534fe337342a57db457a0160952be8c126f77ecb06b4fb97e66e1326a9b46308ef7c1c626dd3718f435cf3c7f699a16026226475fc"' }>
                                        <li class="link">
                                            <a href="injectables/IsValueExistConstraint.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IsValueExistConstraint</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/QuestionController.html" data-type="entity-link" >QuestionController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/VoteController.html" data-type="entity-link" >VoteController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Answer.html" data-type="entity-link" >Answer</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Question.html" data-type="entity-link" >Question</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Votes.html" data-type="entity-link" >Votes</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AnswerQuestionComand.html" data-type="entity-link" >AnswerQuestionComand</a>
                            </li>
                            <li class="link">
                                <a href="classes/AnswerQuestionComandHandler.html" data-type="entity-link" >AnswerQuestionComandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/AnswerQuestionDto.html" data-type="entity-link" >AnswerQuestionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AskQuestionCommand.html" data-type="entity-link" >AskQuestionCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/AskQuestionCommandHandler.html" data-type="entity-link" >AskQuestionCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/AskQuestionDto.html" data-type="entity-link" >AskQuestionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatabaseException.html" data-type="entity-link" >DatabaseException</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpErrorFilter.html" data-type="entity-link" >HttpErrorFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInCommand.html" data-type="entity-link" >SignInCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInCommandHandler.html" data-type="entity-link" >SignInCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUpCommand.html" data-type="entity-link" >SignUpCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUpCommandHandler.html" data-type="entity-link" >SignUpCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUpDto.html" data-type="entity-link" >SignUpDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewQuestionsQuery.html" data-type="entity-link" >ViewQuestionsQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewQuestionsQueryDto.html" data-type="entity-link" >ViewQuestionsQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewQuestionsQueryHandler.html" data-type="entity-link" >ViewQuestionsQueryHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/VoteCommand.html" data-type="entity-link" >VoteCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/VoteCommandHandler.html" data-type="entity-link" >VoteCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/VoteDto.html" data-type="entity-link" >VoteDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IsValueExistConstraint.html" data-type="entity-link" >IsValueExistConstraint</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});