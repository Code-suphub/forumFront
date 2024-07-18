<template>
  <div class="home">
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light macwk-animation">
          <top :message1="active"></top>
          <div class="macwk-privacy soft-layout white bg my-6 py-5">
            <section class="layout-content">
              <div class="container">
                <div class="content-header feedback-header">
                  <div class="h-150 w-r is-align-middle w-r--flex">
                    <div class="w-c w-c-2">
                      <svg
                        width="70"
                        height="60"
                        viewBox="0 0 125 107"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="none" fill-rule="evenodd">
                          <circle
                            cx="48"
                            cy="59"
                            r="48"
                            class="circle-fill"
                          ></circle>
                          <path
                            d="M58.536 39.713c0-6.884 1.72-14.007 5.163-21.368 3.443-7.36 8.167-13.458 14.173-18.292l11.645 7.91c-3.589 4.98-6.262 10.016-8.02 15.106S78.86 33.598 78.86 39.384v13.623H58.536V39.713z"
                            class="path-fill"
                          ></path>
                          <path
                            d="M93.252 39.713c0-6.884 1.722-14.007 5.164-21.368 3.442-7.36 8.166-13.458 14.172-18.292l11.646 7.91c-3.589 4.98-6.262 10.016-8.02 15.106s-2.637 10.529-2.637 16.315v13.623H93.252V39.713z"
                            class="path-fill-1"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div class="w-c w-c-22"><h4>免责声明</h4></div>
                  </div>
                </div>
                <div class="article-global">
                  <p>
                    本网站致力于提供合理、准确、完整的信息，但不保证信息的合理性、完整性和准确性，且不对因信息传递或传送的失误、不准确或错误对用户或任何其他人士负任何直接或间接的责任。本网站有部分资料取自互联网，该部分资料的版权归版权所有人所有，本网站采用的资料信息无法一一和版权者联系，如果本网站所选资料信息的版权所有人认为其作品不宜在网上供公众浏览，或不应无偿使用的，请及时用电子邮件或电话通知我们，以迅速采取适当措施，避免给双方造成不必要的经济损失。本网站所刊发、转载的文章，其版权均归原作者所有，并不代表本网赞同其观点和对其真实性、科学性、严肃性负责；附带版权声明的文章，其版权以附带的版权声明为准。
                  </p>
                  <p>
                    本网站所有信息仅供参考，不做交易和服务的根据，如自行使用本网站资料发生偏差，无论在任何原因下（包括但不限于疏忽原因），对您或任何人通过使用本网站上的信息或由本网站链接的信息，或其他与本网站链接的网站信息所导致的损失或损害（包括直接、间接、特别或后果性的损失或损害，例如收入或利润之损失，电脑系统之损坏或数据丢失等后果），责任均由使用者自行承担（包括但不限于疏忽责任），本网站概不负责，亦不负任何法律责任。
                  </p>
                  <p>
                    本网站刊载各类信息时会选用一些介绍参展企业、组织、团体，及行业相关信息的文章、图片等资料，被选用的文章、图片等资料的作者，如认为不宜公知或不应无偿使用的，恳请及时与我们联系，我们将予以当即删除等妥当处理。一些单位、部门或个人需要使用、转载、复制使用、发表本网站上的文字图片等资料时，必须直接与作者联系征得同意，否则应自负版权等法律责任。
                  </p>
                  <p>
                    任何由于黑客攻击、计算机病毒侵入或发作、因政府管制而造成的暂时性关闭等影响网络正常经营的不可抗力而造成的损失，本网站均得免责。因和本网站链接的其它网站所造成的个人资料泄露及由此而导致的任何法律争议和后果，本网站均得免责。
                  </p>
                  <p>
                    本网站使用者因为违反本声明的规定而触犯中华人民共和国法律的，一切后果自己负责，本网站不承担任何责任。
                  </p>
                  <p>
                    凡以任何方式登陆本网站或直接、间接使用本网站资料者，视为自愿接受本网站声明的约束。
                  </p>
                  <p>
                    本声明未涉及的问题参见国家有关法律法规，当本声明与国家法律法规冲突时，以国家法律法规为准。
                  </p>
                  <p>
                    本网站如无意中侵犯了某个媒体或个人的知识产权，请来信或来电告之，本网站将立即删除。
                  </p>

                  <!---->
                </div>
              </div>
            </section>
          </div>
          <foot />
          <div infos="0">
            <div
              class="
                adBanner
                pub_300x250 pub_300x250m pub_728x90
                text-ad
                textAd
                text_ad text_ads text-ads text-ad-links
              "
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from '@/page/components/Top.vue'
import foot from '@/page/components/Foots.vue'

export default {
  name: 'List',
  components: { top, foot },
  data() {
    return {
      active: 'nav-link active',
    }
  },
}
</script>
