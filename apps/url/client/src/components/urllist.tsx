import { Link, ListItem, UnorderedList, Box, Image, Flex } from '@chakra-ui/react';
import Shortened from './types';

type UrlListProps = {
  urls: Array<Shortened>;
  QRCodes: Array<string>;
};

export const UrlList: React.FC<UrlListProps> = ({ urls, QRCodes }) => {
  return (
    <UnorderedList id="urlList" textAlign="left">
      {urls.map((u, index) => (
        <ListItem key={index}>
          <Flex align="center">
            <Link href={u.short} color="red.300">
              {u.short}
            </Link>{' '}
            - {u.original}
            {QRCodes[index] && (
              <Box ml={2}>
                <Image src={QRCodes[index]} alt={`QR Code for ${u.short}`} boxSize="50px" />
              </Box>
            )}
          </Flex>
        </ListItem>
      ))}
    </UnorderedList>
  );
};



export default UrlList;