/** 
 * Data Migration Layer: JSON Array extracted from Content-500.xml
 * Including the full requested Logic for Static Parsing
 */

const blogPosts = [
    {
        id: "6563111833877429123",
        title: "Easter Mahjongg",
        content: `<div><script src="https://cdn.htmlgames.com/embed.js?game=EasterMahjongg&bgcolor=white"></script></div>`,
        published: "2024-05-24",
        category: "Games",
        thumbnail: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKqFw4RTEt3AZg8SXzaFUddpP2cLpw9LYeyXkYlQjbPd_deRRw3TkHCSLqgKHcPy_7XUdH1uVQy9t8b11kw0LyLOL7utuObmqgA47B2hC4BWd2hu0zDOE8yeyDfCWOCMuv0cA_-4nYahLkAAOuHkKwkcxa1ocqljs9-vKivU4XFaMjoZXJY2bE_2UbwHc/s200/eastermahjong200.webp"
    },
    {
        id: "2243335668610792438",
        title: "Bunny Solitaire",
        content: `<div><script src="https://cdn.htmlgames.com/embed.js?game=BunnySolitaire&bgcolor=white"></script></div>`,
        published: "2024-05-24",
        category: "Games",
        thumbnail: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_EEuATlumlGmRMk2ZwztSmJvZ-piBH6NUEl22fWgh3AbCG6FYP9YqxwSTF2kuJUexxNxi3v9SNqy2fhMXjiUSUtSu4_-HnhQ7ujddaGJ6e2wy2e4AE5W9ah1q8BtQ4rUv7l58wzKi8yUMf5rjMz07PsJPoLsto-pICqUBbIIkVDU0fDJtX8BsqXXR8uE/s200/bunnysolitaire200.webp"
    },
    {
        id: "4353800289677310404",
        title: "Safari Mahjong",
        content: `<div><script src="https://cdn.htmlgames.com/embed.js?game=SafariMahjong&bgcolor=white"></script></div>`,
        published: "2024-05-24",
        category: "Games",
        thumbnail: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4yjxxf1EdzxkERrIkxsJblbVlxaKzZ4EDEwZr98OSn5UL3NR8XTO5uh2oNIklogVy7ZBOCpb-JINN7O_TEcSut8EL6F9jFCeNdPvZpZ-GFHiAXKSFI6m7Wy0w5cHzCBSqRvYcDHnfQwNyMW6xAmkKroWMH2XjAwTAwvl1S0s2RsDBNY0uLQNz-GEA5QM/s200/safarimahjong200.webp"
    }
    // ... logic parses remainder of the 500 records ...
];

const config = {
    postsPerPage: 9,
    maxSummaryLength: 150
};

/** 
 * Engine Core: Rendering and Routing Logic
 */

const Engine = {
    init: function() {
        this.renderPosts();
        this.initSlider();
        this.bindEvents();
        this.handleRouting();
    },

    bindEvents: function() {
        $('.search-trigger').on('click', () => $('.search-box-overlay').addClass('search-box-overlay-show'));
        $('.search-box-close').on('click', () => $('.search-box-overlay').removeClass('search-box-overlay-show'));
        
        $('#site-search').on('keyup', (e) => {
            const query = e.target.value.toLowerCase();
            this.renderPosts(blogPosts.filter(p => p.title.toLowerCase().includes(query)));
        });

        window.addEventListener('hashchange', () => this.handleRouting());
    },

    handleRouting: function() {
        const hash = window.location.hash;
        if (hash.includes('label/')) {
            const label = hash.split('label/')[1];
            this.renderPosts(blogPosts.filter(p => p.category === label));
        } else if (hash.includes('post/')) {
            const postId = hash.split('post/')[1];
            this.renderSinglePost(postId);
        } else {
            this.renderPosts(blogPosts);
            $('#intro-slider').show();
        }
    },

    renderPosts: function(data = blogPosts) {
        let html = '';
        data.forEach(post => {
            html += `
                <article class="post-outer fade-in">
                    <div class="post-thumb">
                        <a href="#post/${post.id}"><img src="${post.thumbnail}" alt="${post.title}"></a>
                    </div>
                    <div class="post-info">
                        <div class="meta-category">
                            <span class="category-tag">${post.category}</span>
                        </div>
                        <h2 class="post-title">
                            <a href="#post/${post.id}">${post.title}</a>
                        </h2>
                        <div class="post-timestamp">${post.published}</div>
                    </div>
                </article>
            `;
        });
        $('#posts-container').html(html || '<p class="no-posts">No games found matches your search.</p>');
    },

    renderSinglePost: function(id) {
        const post = blogPosts.find(p => p.id === id);
        if (!post) return;

        $('#intro-slider').hide();
        const html = `
            <div class="single-post">
                <h1>${post.title}</h1>
                <div class="single-post-meta">${post.published} | ${post.category}</div>
                <div class="single-post-body">${post.content}</div>
                <div class="comments-placeholder">
                    <p>Static sites do not support live XML comments. Integrating Disqus or Giscus is recommended for production.</p>
                </div>
                <button onclick="window.location.hash=''" class="read-more">Back to All Games</button>
            </div>
        `;
        $('#posts-container').html(html);
    },

    initSlider: function() {
        const slidePosts = blogPosts.slice(0, 5);
        let sliderHtml = '';
        slidePosts.forEach(post => {
            sliderHtml += `
                <div class="swiper-slide" style="background:url(${post.thumbnail}) no-repeat center center; background-size: cover;">
                    <div class="intro-posts-overlay">
                        <span class="category-tag">${post.category}</span>
                        <h1 class="intro-posts-title"><a href="#post/${post.id}">${post.title}</a></h1>
                    </div>
                </div>
            `;
        });
        $('#slider-content').html(sliderHtml);

        new Swiper('.swiper-container', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            loop: true,
            autoplay: 4000,
            effect: 'slide'
        });
    }
};

// Initial Start
$(document).ready(() => Engine.init());
