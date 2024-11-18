import React, { useState } from 'react';
import { ResourceContainer, ResourceTable, ViewButton, CloseButton, ResourceFrame } from './styles/ResourcesStyles';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Resources: React.FC = () => {
  const [viewResource, setViewResource] = useState<string | null>(null);

  const resources = [
    { id: 1, details: 'Resource 1 details', fileLink: 'https://docs.google.com/spreadsheets/d/1Q2ar8Wh_LKfxe04EutOw8YsL2MLgJi26YQcn1oO11Vs/edit?gid=1758639864#gid=1758639864' },
    { id: 2, details: 'Resource 2 details', fileLink: 'https://example.com/resource2' },
    { id: 3, details: 'Resource 3 details', fileLink: 'https://example.com/resource3' },
    { id: 4, details: 'Resource 4 details', fileLink: 'https://example.com/resource3' },
    { id: 5, details: 'Resource 5 details', fileLink: 'https://example.com/resource3' },
  ];

  const handleViewResource = (fileLink: string) => {
    setViewResource(fileLink);
  };

  const handleCloseResource = () => {
    setViewResource(null);
  };

  return (
    <>
      <Header />
      <ResourceContainer>
        <h2>Resources</h2>
        <ResourceTable>
          <thead>
            <tr>
              <th>No.</th>
              <th>Details</th>
              <th>File/Link</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource, index) => (
              <tr key={resource.id}>
                <td>{index + 1}</td>
                <td>{resource.details}</td>
                <td>
                  <ViewButton onClick={() => handleViewResource(resource.fileLink)}>View</ViewButton>
                </td>
              </tr>
            ))}
          </tbody>
        </ResourceTable>
        {viewResource && (
          <ResourceFrame>
            <CloseButton onClick={handleCloseResource}>X</CloseButton>
            <iframe src={viewResource} title="Resource View" width="100%" height="500px" />
          </ResourceFrame>
        )}
      </ResourceContainer>
      <Footer />
    </>
  );
};

export default Resources;
