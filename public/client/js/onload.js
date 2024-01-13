var storiesLimit = 30;
function onload() {
  var currentURL = window.location.href.trim();
  window.layout = document.getElementById('environment').getAttribute('title');
  if (currentURL.includes('/story/')) {
    saveStory(currentURL);
  } else if (currentURL.includes('/chapter/')) {
    saveChapter(currentURL);
  } else if (currentURL.includes('/watched')) {
    watchedShow();
  }
}

function saveStory(currentURL) {
  setTimeout(function() {
    // Nếu đang ở trang chi tiết truyện
    var stories = JSON.parse(localStorage.getItem('truyen_da_xem') || '[]');
    var found = false;
    for(var i = 0; i < stories.length; i++) {
      if (stories[i].storyURL == currentURL) {
        found = true;
        break;
      }
    }
    if (!found) {
      console.log('not found');
      if (stories.length >= storiesLimit) {
        stories.splice(-1, 1);
      }
      stories.unshift({
        storyURL: currentURL,
        storyTitle: document.getElementById('book_page_cover').getAttribute('title').trim(),
        storyCover: document.getElementById('book_page_cover').getAttribute('src').trim(),
        chapterURL: false,
        chapterTitle: false
      });
      localStorage.setItem('truyen_da_xem', JSON.stringify(stories))
    }
  }, 5000)
}

function saveChapter(currentURL) {
  setTimeout(function() {
    var storyHref = document.getElementById('story-href').getAttribute('href').trim();
    // Nếu đang ở trang chương truyện
    var stories = JSON.parse(localStorage.getItem('truyen_da_xem') || '[]');
    var found = false;
    for(var i = 0; i < stories.length; i++) {
      if (stories[i].storyURL == storyHref) {
        found = true;
        if (stories[i].chapterURL != currentURL) {
          stories[i].chapterURL = currentURL;
          stories[i].chapterTitle = document.getElementById('story-href').getAttribute('chapter-title').trim()
        }
        break;
      }
    }
    if (!found) {
      console.log('not found');
      if (stories.length >= storiesLimit) {
        stories.splice(-1, 1);
      }
      stories.unshift({
        storyURL: storyHref,
        storyTitle: document.getElementById('story-href').getAttribute('title').trim(),
        storyCover: document.getElementById('story-href').getAttribute('cover-data').trim(),
        chapterURL: currentURL,
        chapterTitle: document.getElementById('story-href').getAttribute('chapter-title').trim()
      });
    }
    localStorage.setItem('truyen_da_xem', JSON.stringify(stories))
  }, 5000)
}

function watchedShow() {
  setTimeout(function() {
    var stories = JSON.parse(localStorage.getItem('truyen_da_xem') || '[]');
    if (!stories.length) {
      document.getElementById('da-xem').innerHTML = '<center><p style="font-size: 18px; font-weight: bold;">Bạn chưa xem truyện nào</p></center>';
      return;
    }
    var storiesList = [];
    for(var i = 0; i < stories.length; i++) {
      var addClass = i%5 === 0 ? 'prepend-1' : i%4 === 0 ? 'last' : '';
      storiesList.push(window.layout == 'desktop' ? itemStoryDesktop(addClass, stories[i]) : itemStoryMobile(addClass, stories[i]));
    }
    document.getElementById('da-xem').innerHTML = storiesList.join('');
  }, 100);
}

function itemStoryDesktop(addClass, item) {
  var link = item.chapterURL || item.storyURL;
  var title = item.chapterTitle ? item.storyTitle + ' - ' + item.chapterTitle : item.storyTitle
  var html = [
    '<div class="span-3 resize invisible-colborder ', addClass ,'">',
    '<a rel="canonical" href="', link ,'">',
    '<div class="cover-highlight center">',
    '<img class="cover large-cover" alt="', title ,'" src="', item.storyCover ,'" title="', title ,'"></div>',
    '<div class="center large-cover-button" id="store_item_links_9192">',
    '<h3 style="font-size: 15px;"><span>', title ,'</span></h3>',
    '</div></a></div>'
  ];
  return html.join('');
}

function itemStoryMobile(addClass, item) {
  var link = item.chapterURL || item.storyURL;
  var title = item.chapterTitle ? item.storyTitle + ' - ' + item.chapterTitle : item.storyTitle
  var html = [
    '<li>',
    '<img class="cover mini-cover '+ addClass +'" alt="'+ title +'" src="'+ item.storyCover +'" title="'+ title +'"><div id="store_item_links_2592671" data-protected="true">',
    '<h3 class="fb-blue small-bottom-margin">'+ title +'</h3>',
    '<h6 class="charcoal"><span class="gray"> M MT </span></h6>',
    '<a class="buy" rel="canonical" href="'+ link +'" data-label="'+ title +'">Xem tiếp</a>',
    '</div>',
    '</li>'
  ];
  return html.join('');
}