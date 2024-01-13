import Queue from 'bee-queue'
import syncSstruyen from '../crawlers/sync.sstruyen.com'
import syncWattpad from '../crawlers/sync.wattpad.vn'

const addQueueStory = new Queue('crawler_story', {
  redis: {
    host: process.env.DEV_CACHE_HOST || '127.0.0.1',
    post: process.env.DEV_CACHE_POST || 6379
  }
})

const addQueueChapter = new Queue('crawler_chapter', {
  redis: {
    host: process.env.DEV_CACHE_HOST || '127.0.0.1',
    post: process.env.DEV_CACHE_POST || 6379
  }
})

addQueueStory.process(function (job, done) {
  try {
    const arr = (job.data.link).split('/')
    const hostname = arr[2]
    console.log(`Processing job ${job.id} ${hostname}`);
    switch (hostname) {
      case 'wattpad.vn':
        syncWattpad.getStoryDetail(job.data.link, job.data.id)
        break;
      case 'sstruyen.com':
        syncSstruyen.getStoryDetail(job.data.link, job.data.id)
        break;  
      default:
        break;
    }
    return done(null, job.data.link + job.data.slug)
  } catch (error) {
    console.log('============ error addQueue', error)
  }
});

addQueueChapter.process(function (job, done) {
  try {
    const arr = (job.data.link).split('/')
    const hostname = arr[2]
    console.log(`Processing job ${job.id} ${hostname}`);
    switch (hostname) {
      case 'wattpad.vn':
        syncWattpad.updateChapter(job.data.link, job.data.id)
        break;
      case 'sstruyen.com':
        syncSstruyen.updateChapter(job.data.link, job.data.id)
        break;  
      default:
        break;
    }
    return done(null, job.data.link + job.data.slug)
  } catch (error) {
    console.log('============ error addQueue', error)
  }
});

export const crawlerToQueueStory = async (data) => {
  const job = addQueueStory.createJob(data);
  job
    .timeout(10000)
    .retries(2)
    .save()
    .then((job) => {
      // job enqueued, job.id populated
      console.log('queue crawler_story job enqueued: '+ job.id)
    });
}

export const crawlerToQueueChapter = async (data) => {
  const job = addQueueChapter.createJob(data);
  job
    .timeout(10000)
    .retries(2)
    .save()
    .then((job) => {
      // job enqueued, job.id populated
      console.log('queue crawler_story job enqueued: '+ job.id)
    });
}

