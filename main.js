/**
 * ============================================================================
 * Junqing Chen (陈俊清) 个人 CV & 作品集网站核心交互脚本
 * 
 * 包含功能：
 * 1. 国际化多语言切换系统 (ZH / EN / PT) 及本地持久化与系统语系探测
 * 2. 联系方式模态窗口 (Modal) 弹出、关闭与无障碍键盘监听
 * 3. 一键复制微信号 / 邮箱 / 电话号码，配合即时 Toast 提示
 * 4. 页面平滑滚动与导航栏高亮状态同步 (ScrollSpy)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // 当前激活语言，默认为中文
    let currentLang = 'zh';

    // ------------------------------------------------------------------------
    // 1. 国际化多语言切换系统 (i18n Switcher)
    // ------------------------------------------------------------------------
    const langButtons = document.querySelectorAll('.lang-btn');

    /**
     * 应用指定语言到页面中的所有标记元素
     * @param {string} lang 目标语言代码 ('zh' | 'en' | 'pt')
     */
    function applyLanguage(lang) {
        if (!window.i18nTranslations || !window.i18nTranslations[lang]) {
            console.warn(`未找到语言包: ${lang}，降级使用中文`);
            lang = 'zh';
        }
        currentLang = lang;

        const dict = window.i18nTranslations[lang];

        // 1. 更新网页标题与 HTML 根标签属性
        if (dict.page_title) document.title = dict.page_title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && dict.page_description) {
            metaDesc.setAttribute('content', dict.page_description);
        }

        const htmlLangMap = { zh: 'zh-CN', en: 'en', pt: 'pt-PT' };
        document.documentElement.lang = htmlLangMap[lang] || 'zh-CN';

        // 2. 更新纯文本内容 (data-i18n)
        const textElements = document.querySelectorAll('[data-i18n]');
        textElements.forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) {
                el.textContent = dict[key];
            }
        });

        // 3. 更新带 HTML 标签的内容 (data-i18n-html，如 <strong>、<br>)
        const htmlElements = document.querySelectorAll('[data-i18n-html]');
        htmlElements.forEach((el) => {
            const key = el.getAttribute('data-i18n-html');
            if (dict[key] !== undefined) {
                el.innerHTML = dict[key];
            }
        });

        // 4. 更新语言切换按钮状态
        langButtons.forEach((btn) => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });

        // 5. 保存到 localStorage 便于下次记忆
        try {
            localStorage.setItem('user_preferred_lang', lang);
        } catch (e) {
            // 忽略隐私模式或本地限制
        }
    }

    // 绑定语言切换按钮点击事件
    langButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.getAttribute('data-lang');
            if (selectedLang && selectedLang !== currentLang) {
                applyLanguage(selectedLang);
            }
        });
    });

    // 初始化语言偏好：优先级为 localStorage > 浏览器语言探测 > 默认中文
    function initLanguagePreference() {
        let savedLang = null;
        try {
            savedLang = localStorage.getItem('user_preferred_lang');
        } catch (e) {}

        if (savedLang && ['zh', 'en', 'pt'].includes(savedLang)) {
            applyLanguage(savedLang);
            return;
        }

        // 探测浏览器首选语言
        const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
        if (browserLang.startsWith('pt')) {
            applyLanguage('pt');
        } else if (browserLang.startsWith('en')) {
            applyLanguage('en');
        } else {
            applyLanguage('zh');
        }
    }

    initLanguagePreference();

    // ------------------------------------------------------------------------
    // 2. 联系方式模态框逻辑 (Contact Modal)
    // ------------------------------------------------------------------------
    const contactModal = document.getElementById('contact-modal');
    const openContactBtn = document.getElementById('open-contact-btn');
    const navContactLink = document.getElementById('nav-contact-link');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalDoneBtn = document.getElementById('modal-done-btn');

    /**
     * 打开联系模态框
     */
    function openModal() {
        if (!contactModal) return;
        contactModal.classList.add('active');
        contactModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // 禁止页面滚动
    }

    /**
     * 关闭联系模态框
     */
    function closeModal() {
        if (!contactModal) return;
        contactModal.classList.remove('active');
        contactModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // 恢复页面滚动
    }

    // 绑定打开按钮事件
    if (openContactBtn) openContactBtn.addEventListener('click', openModal);
    if (navContactLink) {
        navContactLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }

    // 绑定关闭按钮事件
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeModal);

    // 点击遮罩层空白处关闭
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                closeModal();
            }
        });
    }

    // 按下 ESC 键安全退出模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal && contactModal.classList.contains('active')) {
            closeModal();
        }
    });

    // ------------------------------------------------------------------------
    // 3. 一键复制剪贴板与 Toast 提示逻辑
    // ------------------------------------------------------------------------
    const copyButtons = document.querySelectorAll('.btn-copy');
    const toast = document.getElementById('copy-toast');
    let toastTimeout = null;

    /**
     * 展示复制成功的浮动提示
     * @param {string} message 提示文案
     */
    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');

        // 清除上一次的计时器，防止连击闪烁
        if (toastTimeout) clearTimeout(toastTimeout);

        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2200);
    }

    /**
     * 写入剪贴板（兼顾现代 API 与降级处理）
     */
    copyButtons.forEach((btn) => {
        btn.addEventListener('click', async () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            const dict = window.i18nTranslations && window.i18nTranslations[currentLang] 
                ? window.i18nTranslations[currentLang] 
                : { toast_copied: '已复制: ' };

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(textToCopy);
                } else {
                    // 后备降级方案：创建临时文本域
                    const textArea = document.createElement('textarea');
                    textArea.value = textToCopy;
                    textArea.style.position = 'fixed';
                    textArea.style.opacity = '0';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                }
                showToast(`${dict.toast_copied || '已复制: '}${textToCopy}`);
            } catch (err) {
                showToast('复制失败，请手动选择复制');
            }
        });
    });

    // ------------------------------------------------------------------------
    // 4. 导航栏随滚动自动激活当前高亮项 (ScrollSpy)
    // ------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // 偏移顶部导航栏高度

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach((link) => {
                const href = link.getAttribute('href');
                if (href === `#${currentSectionId}`) {
                    link.classList.add('active');
                } else if (href && href.startsWith('#') && href !== '#contact') {
                    link.classList.remove('active');
                }
            });
        }
    });
});
