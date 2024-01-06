class RSSFeed {
  constructor(data) {

    console.log(`RssFeeder ${data[0].rss.channel.title}`);
    console.log(data);
    // datas = data[0];
    // return;

    this.rss = {
      // "@attributes": data.rss["@attributes"] || { version: "2.0" },
      channel: this.parseChannel(data.rss.channel) || null,
    };
  }

  parseChannel(channelData) {
    if (!channelData) return null;
    return {
      title: channelData.title || null,
      link: channelData.link || null,
      description: channelData.description || null,
      image: this.parseImage(channelData.image) || null,
      item: this.parseItem(channelData.item) || null,
    };
  }

  parseImage(imageData) {
    if (!imageData) return null;

    return {
      title: imageData.title || null,
      link: imageData.link || null,
      url: imageData.url || null,
    };
  }

  parseItem(itemData) {
    if (!itemData) return null;

    const parsedItem = [];
    const propertiesToParse = [
      'title',
      'link',
      'guid',
      'description',
      'pubDate',
      'og_title',
      'og_description',
      'og_url',
      'og_type',
      'og_image',
      'twitter_card',
      'twitter_site',
      'twitter_title',
      'twitter_description',
      'twitter_image',
      'dc_language',
      'dc_format',
      'dc_identifier',
      'category',
    ];

    for (const property of propertiesToParse) {
      parsedItem[property] = itemData[property] || null;
    }

    return parsedItem;
  }
}

class RSSItems {
  constructor(data) {
    this.items = [];
    $.each(data, (ind, ite) => {
      const items = data[ind].rss.channel.item;
      $.each(items, (index, item) => {
        this.items.push(item);
      });
    });
  }
}
