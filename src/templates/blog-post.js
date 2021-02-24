import React from "react"
import { Link, graphql } from "gatsby"
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser"
import moment from "moment"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import FromBlog from "../components/FromBlog"
import HeroBanner from "../components/BlogBanner"

export default function blogPost({ data }) {
  console.log(data);
  return (
    <Layout>
      <SEO title="Home" />
      <HeroBanner />
      <div className="blog-container">
        <div className="blog-detail">
          <h2>
            {data.contentstackBlogPost.title
              ? data.contentstackBlogPost.title
              : ""}
          </h2>
          <p>
            {moment(data.contentstackBlogPost.date).format("ddd, MMM D YYYY")},{" "}
            <strong>{data.contentstackBlogPost.author[0].title}</strong>
          </p>
          {ReactHtmlParser(data.contentstackBlogPost.body)}
        </div>
        <div className="blog-column-right">
          <div className="related-post">
            {data.contentstackPage.page_components[2].widget && (
              <h2>
                {data.contentstackPage.page_components[2].widget.title_h2}
              </h2>
            )}
            <FromBlog />
          </div>
        </div>
      </div>
      {console.log("DDD", data)}
    </Layout>
  )
}

export const postQuery = graphql`
  query($title: String!) {
    contentstackBlogPost(title: { eq: $title }) {
      url
      title
      body
      date
      author {
        url
        title
        bio
        picture {
          url
          title
        }
      }
      related_post {
        body
        url
        title
        date
      }
      seo {
        enable_search_indexing
        keywords
        meta_description
        meta_title
      }
    }
    contentstackPage {
      page_components {
        widget {
          title_h2
          type
        }
      }
    }
  }
`
