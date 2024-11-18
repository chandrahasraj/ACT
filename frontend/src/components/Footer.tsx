import {
  FooterFooter,
  FooterNewsContainer,
  FooterNewsContent,
  FooterNewsHeading,
  FooterNewsItem,
  FooterText,
} from '../pages/styles/FooterStyles';

const Footer = () => {
  return (
    <FooterFooter>
      <FooterNewsContainer>
        <FooterNewsHeading>Latest News</FooterNewsHeading>
        <FooterNewsContent>
          <FooterNewsItem>
            🚀 New feature released: We've just launched a new analytics
            dashboard! Check it out now.
          </FooterNewsItem>
          <FooterNewsItem>
            📅 Upcoming Webinar: Join us for a live webinar on React best
            practices next week.
          </FooterNewsItem>
          <FooterNewsItem>
            🎉 Company Milestone: We’ve reached 1 million users! Thank you for
            your support.
          </FooterNewsItem>
          <FooterNewsItem>
            🔧 Maintenance Update: Scheduled maintenance on August 30th from 2
            AM to 4 AM UTC.
          </FooterNewsItem>
          <FooterNewsItem>
            💡 Tip of the Day: Use React Hooks for cleaner and more readable
            code.
          </FooterNewsItem>
        </FooterNewsContent>
      </FooterNewsContainer>
      <FooterText>© 2024 Your Company. All rights reserved.</FooterText>
    </FooterFooter>
  );
};

export default Footer;
