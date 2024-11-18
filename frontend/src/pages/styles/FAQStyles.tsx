import styled from 'styled-components';

export const FaqPageContainer = styled.div`
    .faq-page {
        padding: 20px;
        background-color: #f8f9fa;
        min-height: 80vh;
    }

    h1 {
        font-size: 2.5rem;
        margin-bottom: 30px;
        color: #343a40;
    }

    .collapse-sec {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .faq-item {
        margin-bottom: 15px;
        cursor: pointer;
        border-bottom: 1px solid #dee2e6;
        padding-bottom: 10px;
    }

    .faq-item.active .question {
        font-weight: bold;
    }

    .question {
        font-size: 1.2rem;
    }

    .idea-query {
        color: #495057;
    }

    .answer {
        padding: 15px 0;
        background-color: #f1f3f5;
        border-radius: 8px;
    }

    .idea-pblms {
        padding: 10px;
        background-color: #f1f3f5;
        border-radius: 8px;
    }

    .idea-pblm-list {
        margin-bottom: 15px;
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 2rem;
        }

        .collapse-sec {
            padding: 15px;
        }

        .question {
            font-size: 1rem;
        }

        .idea-query {
            font-size: 0.9rem;
        }

        .answer {
            padding: 10px;
        }
    }
`;
