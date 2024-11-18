import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaqPageContainer } from './styles/FAQStyles';

const FaqPage = () => {
    const faqData = [
        {
            question: "What is the purpose of this platform?",
            answer: "This platform is designed to help users learn and grow through various courses and resources."
        },
        {
            question: "How do I submit an idea?",
            answer: "You can submit an idea by navigating to the 'Idea Submission' section and filling out the required fields."
        },
        {
            question: "Can I track my progress?",
            answer: "Yes, you can track your progress through the 'Dashboard' where all your activities are recorded."
        },
        {
            question: "How do I contact support?",
            answer: "You can contact support by visiting the 'Support' page and filling out the contact form."
        },
        {
            question: "What are the system requirements?",
            answer: "You need a modern web browser and an active internet connection to use the platform."
        },
        {
            question: "Is there a mobile app available?",
            answer: "Currently, there is no mobile app. The platform is accessible via mobile web browsers."
        },
        {
            question: "How do I reset my password?",
            answer: "To reset your password, go to the 'Forgot Password' link on the login page and follow the instructions."
        }
    ];

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <FaqPageContainer>
            <Header />
            <div className="faq-page">
                <div className="idea-section text-center container">
                    <h1>FAQ’s</h1>
                    <Row className="justify-content-center">
                        <Col md={10}>
                            <div className="collapse-sec idea-que-sec pt-2">
                                {faqData.map((que, index) => (
                                    <div
                                        key={index}
                                        className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                                    >
                                        <div
                                            className="question"
                                            onClick={() => toggleAccordion(index)}
                                        >
                                            <div className="idea-query py-3">
                                                <span className="avatar-txt">
                                                    {que.question}
                                                </span>
                                            </div>
                                        </div>
                                        {activeIndex === index && (
                                            <div className="answer">
                                                <div className="idea-pblms">
                                                    <div className="idea-pblm-list">
                                                        <Row className="justify-content-between w-100">
                                                            <Col
                                                                md={12}
                                                                xl={12}
                                                                className="my-auto text-left"
                                                            >
                                                                <div
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: que.answer
                                                                    }}
                                                                ></div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <Footer />
        </FaqPageContainer>
    );
};

export default FaqPage;
